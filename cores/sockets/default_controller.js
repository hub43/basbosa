var SocketServer 		= require('./components/socket_server'),
		Models        = require('./../models'),
		Group					= Models.Group,
		User					= require('./../models').User,
		j							= Models.ClientModels.J;

// Final handler to any message sent to server
SocketServer.on('connection', function(socket) {
	socket.lon('*', 'last', function(e, message, next) {
		// preserve context
		socket = this;
		if (!socket || ! socket.emit) {
			Logger.warn('Socket now is null while trying to send message', message, e);
			next();
			return;
		}
		if (e.result && e.result.message) {
			e.result.message.eventName = e.result.eventName;
			if (e.result.broadcast) {
				// broadcast to everyone
				Logger.debug("Broadcasting to everyone");
				socket.broadcast.emit(e.result.eventName, e.result.message);
			} else if (e.result.broadcastTo) {
				var	sectors = typeof e.result.broadcastTo.push === 'function'  ? e.result.broadcastTo : [e.result.broadcastTo];
				
				// broadcast to everyone in channel
				_.each(sectors, function(sector) {
					Logger.debug("Broadcasting to sector " + sector);
					socket.broadcast.to(sector).emit(e.result.eventName, e.result.message);
				});
				
				if (e.result.broadcastToSelf) {
					Logger.debug("Emitting to socket");
					socket.emit(e.result.eventName, e.result.message);
				} 				
			} else if (e.result.sockets) {
				_.each(e.result.sockets, function(userSocket) {
					Logger.debug("Sending to socekts" , userSocket.id);
					userSocket.emit(e.result.eventName, e.result.message);
				});
				
			} else {
				// broadcast to socket
				Logger.debug("Emitting to socket");
				socket.emit(e.result.eventName, e.result.message);
			}
			Logger.debug(e.result.eventName);
		}
		next();
	});
	
	// To prevent multiple calls when each user connects, make sure we only bind once
	j.group.off('groupUpdate');
	j.group.on('groupUpdate', function(params) {
		_.each(params.updateArgs, function(updateArg) {
			j.group.update(updateArg);
		});
		
		socket = j.group.sectors.get(params.sectorId).getSocket();
		if (socket) {
			message = {	eventName :  'group.update_result' };
			_.extend(message, params);
			socket.emit(message.eventName, message);
			socket.broadcast.to('sector' + params.sectorId).emit(message.eventName, message);
		}
	});
});
