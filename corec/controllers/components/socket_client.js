define([
		'../../libs/leveled_events'
	, 'basbosa-logger'
	, 'underscore'
	,	'socketio'
	, 'basbosa-config'
	
	], function(LeveledEvents, Logger) {
	
	SocketClient = {};
	
	var url = Basbosa('Config').read('socketUrl');
	
	SocketClient = io.connect(url, {
		'auto connect' : false, 
		'transports':  [ ('WebSocket' in window) ? 'websocket' : 'xhr-polling']
	});
	

	_.extend(SocketClient, new LeveledEvents());
	
	SocketClient.sendPacket = function(eventName, message) {
		Logger.debug('Sending ' + eventName, message);
		message.eventName = eventName;
		//SocketClient.emit(eventName, message);
		SocketClient.json.send(message);
	};
	Basbosa && Basbosa.add('SocketClient', SocketClient);
	return SocketClient;
});
