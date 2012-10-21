define([
		'./components/socket_client'
	,	'./../models/j'
	, './index'
	], function(SocketClient, j) {
	// handle the special message group.udate_result
	SocketClient.lon('group.update_result', function(e, message, next){ next(); });
	
	SocketClient.lon('*', function(e, message, next) {
		if (typeof message.updateArgs !== 'undefined') {
			for(var i = 0, l = message.updateArgs.length; i < l; i++) {
				j.group.update(message.updateArgs[i]);
			}
		}
		next();
	});
	
	j.lon('ui.*', 'last', function(e) {
		SocketClient.sendPacket(e.name.replace('ui.', ''), e.message);
	});
	
	return null;
});
