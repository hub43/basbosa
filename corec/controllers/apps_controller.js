define([
		'./components/socket_client'
	,	'../models/j'
	], function(SocketClient, j) {
	j.lon('ui.apps.join', function(e, message, next) {
		j.user.activities.add(j.group.apps.get(message.appId));
		next();
	});
	return null;
});
