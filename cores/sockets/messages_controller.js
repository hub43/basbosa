var Messages = require ('../models/messages'), SocketServer = require ('../sockets/components/socket_server');

var n = 10, queue = [], msg, messages;

SocketServer.on('connection', function (socket) {
	socket.lon ('*', function (e, message, next) {
		msg = _.extend({}, message);
		next();
		if (!msg.internalMessage) {
			if(msg.eventName != 'network.ping') {
				messages = new Messages;
				messages.set("message", msg);
				messages.set("timestamp", new Date().getTime());
				queue.push(messages);
				if (queue.length == n) {
					queue[0].create (queue);
					queue = [];
				}
			}
		}
	});
});

