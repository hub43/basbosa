define([
		'../models/user'
	, './components/socket_client'
	, '../models/j'
	], function(UserModel, SocketClient, j) {

	
	
	// Just allow this event from UI to socket server
	j.lon('ui.sectors.join', function(e, message, next) { next(); });
	j.lon('ui.sectors.enter', function(e, message, next) { next(); });

	SocketClient.lon('sectors.enter_result', function(e, message, next) {
		var newUser;
		// Add the user to the list of users in the sector
		if (message._id == j.user.id) {
			// If the current user is the one who is allowed to enter the sector
			j.group.sectors.get(message.sectorId).users.add(j.user);
			if (message.sectorId != j.user.get('sectorId')) {
				Basbosa('Logger').warn('User is joining a sector' + message.sectorId + 
						' which is  different from the one he wanted to join' + j.user.get('sectorId'));
			}
		} else {
			// If different user is allowed to enter the sector
			newUser = new UserModel(message);
			j.group.sectors.get(message.sectorId).users.add(newUser);
			j.group.users.add(newUser);
		}
		
		next();
	});

	SocketClient.lon('sectors.join_result', function(e, message, next) {
		// if a user can join the sector
		if (message.sectorId) {
			j.activeSector = j.group.sectors.get(message.sectorId);

			// A user can join a sector and see messages on it without being logged in or appear in the
			// sectors users list
			
			// add users currently in sector
			_.each(message.users, function(user) {
				j.group.sectors.get(message.sectorId).users.add(new UserModel(user));
			});
			
			j.user.addActivity(j.group.sectors.get(message.sectorId));
		}
		next();
	});
	
	SocketClient.lon('sectors.disconnect_result', function(e, message, next) {
		j.group.sectors.each(function(sector) {
			user = sector.users.get(message.senderUserId);
			user && sector.users.remove(user);
		});
	});
	
	j.lon('ui.sectors.disconnect', function(e, message, next) { next(); });
	
});
