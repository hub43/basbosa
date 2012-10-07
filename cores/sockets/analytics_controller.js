var Analytics = require ('../models/analytics'), SocketServer = require ('../sockets/components/socket_server');

var n = 1, queue = [], msg, analytics;

SocketServer.on('connection', function (socket) {
	socket.lon ('*', function (e, message, next) {
		// disable recording messages for now 
		next();
		return;
		msg = _.extend({}, message);
		next();
		
		if (!msg.internalMessage) {
			analytics = new Analytics;
			analytics.set("message", msg);
			analytics.set("timestamp", new Date().getTime());
			
			queue.push(analytics);
			
			if (queue.length == n) {
				queue[0].create (queue);
				queue = [];
			}
		}
	});
});

