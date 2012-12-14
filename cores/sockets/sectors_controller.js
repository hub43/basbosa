var SocketServer = require('./components/socket_server')
	, Models        = require('./../models')
  , User					= require('./../models').User
  , Sector				= require('./../models').Sector
	, j							= Models.ClientModels.J
	,UserModel					=require('../models/user');
	userModel = new UserModel;

// Sectors.join just makes a user able to receive all events and updates to the sector
// she joins. She should not be able to send any updates to the sector unless she enters  
SocketServer.on('connection', function(socket) {
	socket.lon('sectors.join',  function(e, message, next) {
		Basbosa('Logger').debug('User ' + socket.handshake.userId + 'joined sectorid: ' + message.sectorId);
		
		sector = j.group.sectors.get(message.sectorId);
		function finalize(e, message, next) {
			_.extend(e.result.message, { 
				sectorId 	: e.message.sectorId,
			  // Set a list of current users in the same sector back to the new user
			  users		: j.group.sectors.get(message.sectorId).users.toJSON(), 
			});
			next();
		}
		if (!sector || sector.users.length >= sector.maxUsers ) {
			Basbosa('Logger').info('We got a request for a non-existing  or full sectorId ' + message.sectorId);
			Basbosa('Logger').info('Preparing new sector for user');
			
			// A little bit tricky, we should preserve the values of variables
			(function(e, message, next, socket) {
				(new Sector).getSectorForUser(message.senderUserId, function(sectorId) {
					message.sectorId = sectorId;
					socket.join('sector' + message.sectorId);
					sector = j.group.sectors.get(message.sectorId);
				});
				//finalize(e, message, next);
			})(e, message, next, socket);		
		} else {
			finalize(e, message, next);
		}
		
	});
	
	socket.lon('sectors.enter', function(e, message, next) {
		Basbosa('Logger').debug('User ' + socket.handshake.userId + ' enter sectorId: ' + message.sectorId);
		var sector = j.group.sectors.get(message.sectorId),
			user = j.group.users.get(socket.handshake.userId);
		
		sector.users.add(user);

		
		sector.users.get(socket.handshake.userId).sectors.add(sector);
		socket.join('sector' + message.sectorId);
		
		// Just reflect it back to all users in sector
		 _.extend(e.result.message, message, user.toJSON());;
		e.result.broadcastTo = 'sector' + message.sectorId;
		e.result.broadcastToSelf = true;
		next();

	});
	
	socket.lon('sectors.disconnect', function(e, message, next) {
		var userId = socket.handshake.userId, user;
		  if (!j.group || !j.group.users) {
		  	next();
		  	return;
		  }
		user = j.group.users.get(socket.handshake.userId);
		e.result.broadcastTo = [];
		if (!user) {
			Basbosa('Logger').warn('No user found in the group with userId :' + userId);
			Basbosa('Logger').warn(socket);
		} else {
			// Send a message to all sectors user that he is leaving
			user && user.sectors.each(function(sector) {
				sector.users.remove(user);
				e.result.message.senderUserId = userId;
				e.result.broadcastTo.push('sector' + sector.id);
			});
			// Should not remove the reference of user until we play for him and 
			// finalize storing his info to the db
			//j.group.users.remove(userId);
			//Set End Time of Last Visit of this user
			userModel.setEndVisitTime(userId, user.get('lastEntryTime'));
		}
		next();
	});
	
});