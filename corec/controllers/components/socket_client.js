define([
		'../../libs/leveled_events'
	, '../../libs/logging_module'
	, 'underscore'
	,	'socketio'
	
	], function(LeveledEvents, Logger) {

	
	SocketClient = io.connect('/', {
		'auto connect' : false, 
		'transports':  [ ('WebSocket' in window) ? 'websocket' : 'xhr-polling']
	});

	_.extend(SocketClient, new LeveledEvents());
	
	SocketClient.send = function(eventName, message) {
		Logger.debug('Sending ' + eventName, message);
		message.eventName = eventName;
		SocketClient.emit(eventName, message);
	};
	Basbosa && Basbosa.add('SocketClient', SocketClient);
	return SocketClient;
});
