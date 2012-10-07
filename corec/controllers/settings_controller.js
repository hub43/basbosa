define([
		'./components/socket_client'
	,	'../models/j'
	], function(SocketClient, j) {
	
	j.lon('ui.settings.update', function(e, message, next) { 
		j.user.set(message.setting, message.value);
		next();
	});
	
	return null;
});
