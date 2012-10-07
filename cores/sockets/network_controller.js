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
});