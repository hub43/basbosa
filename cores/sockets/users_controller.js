var SocketServer		= require('./components/socket_server'),
		Models        = require('./../models'),
		User					= require('./../models').User,
		j							= Models.ClientModels.J;

SocketServer.on('connection', function(socket) {
	socket.lon('users.getMe', function(e, message, next) {
		if (socket.handshake.userId !== undefined) { 
			var userId = socket.handshake.userId.toString();
			Logger.info('the user Id that we need to check on it :'+ userId);
			var user = new User(), ObjectID = require('mongodb').ObjectID;
			
			user.findById(userId, function(error, user) {
				if(error) {
					Logger.info('error through check on userId :' + userId + 'in userAuthentication method');
				}
				if(!user) {
					Logger.debug('this userId :' + userId + ' not exist in the db', user);
					e.result.eventName = 'users.getMe_result';
					e.result.message.user = false;
				} else {
					Logger.debug('this userId :' + userId + ' is exist in the db', user);
					e.result.message.user  =  user;
				}
				next();
		  });  
		} else {
			e.result.message.user  =  false;
			next();
		}
		
	});

});