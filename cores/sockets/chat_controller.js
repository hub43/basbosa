var SocketServer		= require('./components/socket_server'),
		Models        = require('./../models'),
		j							= Models.ClientModels.J;

SocketServer.on('connection', function(socket) {
	socket.lon('chat.message', function(e, message, next) {
		
		// Only constructs result
	  // App will handle emitting that result to everyone connected
	  Logger.debug("Event (chat.message) invoked at level 10");
	  if (message.users && message.users.length) {
	  	e.result = {
	  	    eventName : 'chat.message_result',
	  	    sockets 	: [],
	  	    message   : message
	  	  };
	  	_.each(message.users, function(userId) {
	  		_.each(j.groups.first().users.get(userId).sockets, function(userSocket) {
	  			e.result.sockets.push(userSocket);
		  	});
	  	});
	  } else {
	  	e.result = {
	  	    eventName   : 'chat.message_result',
	  	    broadcastTo : 'sector' + message.activityId,
	  	    message     : message
	  	  };
	  	var msg = _.extend({}, message);
	  	msg.senderUser = j.group.users.get(message.senderUserId).toJSON();
	  	j.group.sectors.get(message.activityId).messages.add(msg);
	  }

	  next();
	  
	});
});