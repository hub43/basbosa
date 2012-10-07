var SocketServer		= require('./components/socket_server'),
		Models        = require('./../models'),
		j							= Models.ClientModels.J;

SocketServer.on('connection', function(socket) {
	socket.lon('settings.update', function(e, message, next) {
		var user = j.group.users.get(message.senderUserId);
		
		// Update user setting and write it to the db
		user.set(message.setting, message.value);
		user.update();
		
	  next();
	});
});