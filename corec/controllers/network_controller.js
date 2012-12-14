define([
		'./components/socket_client'
	,	'../models/network'
	, '../models/j'
	], function(SocketClient, NetworkModel, j) {
		j.network = new NetworkModel();
		
		var networkPing = setInterval(function(){
			SocketClient.sendPacket('network.ping', j.network.genPing());
		}, j.network.get('options').pingInterval);
		
		SocketClient.lon('network.ping_result', function(e, message, next) {
			j.network.processPing(message);
			next();
		});
		
		//Monitor the server
		SocketClient.lon('*', function(e, message, next) {
			j.network.set({'lastMessageTime' : (new Date).getTime()});
			j.network.set('serverDown', 0);
			next();
		});
		
		j.network.on('requestPing', function() {
  		Basbosa('Logger').debug('sending network ping');
  		SocketClient.sendPacket('network.ping', j.network.genPing());
		});
		
		var monitor = setInterval(function() {
				j.network.monitor();
		}, j.network.get('options').monitorInterval);
		
		j.lon('ui.network.stop', function(e, messaga, next) {
			clearInterval(networkPing);
			clearInterval(monitor);
		});
		return null;
});
