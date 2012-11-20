var SocketServer		= require('./components/socket_server');

SocketServer.on('connection', function(socket) {
	socket.lon('network.ping', function(e, message, next) {
	  // Only constructs result
	  // App will handle emitting that result to everyone connected
	  message = _.extend({serverTime : (new Date()).getTime()}, message);
	  e.result = {
	    eventName   : 'network.ping_result',
	    message     : message
	  };
		next();
	});
	
	socket.lon('*', function(e, message, next) {
		if(j.group === undefined) next();
		var user = j.group.users.get(message.senderUserId);
		user && user.set('lastOnline', (new Date).getTime());
		next();	
	});
});