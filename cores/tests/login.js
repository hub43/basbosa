var	User					= require('../models/user')
	,	SocketClient	= require('../sockets/components/socket_client')
	,	Sector				= require('../models/sector')
	, Config				= require(APP_PATH + '/config');

module.exports.create = function(cb) {
	var user = new User();
	user.getDummy(true, function(err, user) {
		
		user.socket = new SocketClient.connect(Config.testServer);
		Sector.prototype.getSectorForUser(user._id, function(sectorId) {
			user.sectorId = sectorId;
			
			cb(user);
			
			user.socket.on('connect', function() {
				Basbosa('Logger').debug('Sending Auth socket from a client');
				if (user.entered) return;
				user.socket.mySend({
					eventName : 'authn.socket',
					internalMessage : true,
					userId		: user._id
				});
			});
			
			
			user.socket.on('authn.socket_result', function(message) {
				user.entered = 1;
				Basbosa('Logger').debug('Client ' + user._id + 'got socket_result', message);
				
				user.socket.mySend({
					eventName : 'sectors.join',
					sectorId		: user.sectorId
				});
			});
			
			user.socket.on('sectors.join_result', function(message) {
				user.socket.mySend({
					eventName : 'sectors.enter',
					sectorId		: user.sectorId,
					isBot				: true
				});
				
				setInterval(function() {
					user.socket.mySend({
						activityId: Config.testSectorId,
						eventName: "chat.message",
						text: "Hi from " + user.username,
						userId: user._id,
						userPhoto: user.photo,
						username: user.username
					});
				}, 500000000);
				
				
				setInterval(function() {
					user.socket.mySend({
						eventName: "users.location",
						userId: user._id,
						target : {
							x : Math.floor(Math.random() * 500),
							y : Math.floor(Math.random() * 500),
						}
					});
				}, 50000000);
				
			});
			
		});
	});	
};