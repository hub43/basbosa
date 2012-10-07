var io 			= require('socket.io-client')
	, Config	= require(APP_PATH + '/config');

var _options = {};
module.exports.connect = function(server, options) {
	Logger.debug('Trying to connect to ' + server);
	var socket = io.connect(server, {'force new connection' :  true});
	socket.mySend = function (message) {
		Logger.debug('Client Socket Sending:' ,  message);
		socket.emit(message.eventName, message);
	};
	return socket;
}; 
