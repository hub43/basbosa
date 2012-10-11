define([
		'../models/user'
	, './components/socket_client'
	, '../models/j'
	], function(User, SocketClient, j) {

	var here = {};

	// No longer used
	function authUser() {
		if (j.user && !j.user.has('_id') && j.user.has('username') && j.user.has('password')) {
			$.post('/login', {username: j.user.get('username'), password: j.user.get('password')}, function(userServer) {
				if (userServer && userServer._id) {
					j.user.set(userServer);
					//$.extend(j.user, res);
					if (j.user.has('_id')) {
						// Once our user has an id and socket is open, lets authenticate the socket
						SocketClient.sendPacket('authn.socket', {
								userId	:	j.user.id
						});
					}
				}
			});
		}
	}
	
	SocketClient.on('connect', function() {
		authUser();
		//  only try to authenticate the socket if the user has a valid id and is not authenticated
		if (j.user.has('_id')) {
			SocketClient.sendPacket('authn.socket', { userId : j.user.id });
		}
	});
	
	// Try to auth as soon as we are connected
	SocketClient.lon('authn.socket_result', function(e, message, next){
		// If the server did not find user id in the session or db
		if (message.user == -1) {
			//window.location.reload(); 
			Logger.warn('Server did not find user id in session');
		} else {
			next();
		}
		
	});
	
	SocketClient.lon('*', 'first', function(e, message, next) {
		if (message.senderUserId) {
			j.group.findUserById(message.senderUserId, function(user) {
				user && (message.senderUser = user.toJSON());
				next();
			});
		} else {
			next();
		}	
	});

	return here;
});
