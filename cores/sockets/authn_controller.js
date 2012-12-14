var Libs        	= require('./../libs'),
		SocketServer	= require('./components/socket_server'),
		ClientModels  = require('./../models').ClientModels,
		Models        = require('./../models'),
		j							= Models.ClientModels.J;


SocketServer.on('connection', function(socket) {
	socket.lon('authn.socket', function(e, message, next) {
		if (Config.skipSocketAuth && message.userId) {
			socket.handshake.userId = message.userId;
			Basbosa('Logger').debug('User skip auth in effect');
		} 
		
		if (!socket.handshake.userId) {
			socket.handshake.userId = '50689cca2612229c1b00003d';
		}
		Basbosa('Logger').debug('Checking handshake for user', socket.handshake);
		var userId = socket.handshake.userId.toString(), user = new ClientModels.User();
		
		user.findById(userId, {pointsLog : 0, visits: 0, friends : 0}, function (err, userDb) {	
			if (userDb) {
				Basbosa('Logger').debug('Found fb user', userDb);
				j.group.users.replace(userDb);
				j.group.users.get(userId).sockets.push(socket);
				e.result.message.userId  =  userId;
				Basbosa('Logger').debug('Calling next for userId' + userId + ' which should emit authn.socket');
			} else {
				Basbosa('Logger').debug('Was not able to find user ' + userId + ' in db');
				Basbosa('Logger').debug('Asking user to refresh session');
				e.result.message.userId = -1;
			}
			
			next();
		});
	});

});