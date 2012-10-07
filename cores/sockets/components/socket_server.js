var Sio 		= require('socket.io')
	,	Libs 		= require('../../libs')
	, Events	= require('events')
	, cookie = require('cookie');

function SocketServer() {

}

var Store = Libs.Store;


SocketServer.prototype = new Events.EventEmitter();
// All controllers listen on new connections, default is 10, increase is to 20
SocketServer.prototype.setMaxListeners(20);
SocketServer.prototype.init = function(App) {
	var self = this;
	var WS = SocketServer = Sio.listen(App.server);
	WS.set('log level', Config.logging);
	WS.set('transports', [ 'websocket', 'htmlfile',
			'xhr-polling', 'jsonp-polling' ]);
	
	WS.set('transports', ['websocket', 'xhr-polling']);

	WS.set('authorization', function(data, accept) {
		if (Config.skipSocketAuth) {
			Logger.info('Session accepted in skipAuth Mode');
			accept(null, true);
			return ;
		}
		if (data.headers.cookie) {
			data.cookie = cookie.parse(data.headers.cookie);
			data.sessionID = data.cookie['express.sid'].replace('s:', '').split('.')[0];
			// get the session data from the session store
			Logger.debug('trying to get sesseion for sessionid ' +  data.sessionID);
			Store.sessionStore.get(data.sessionID, function(err, session) {
				if (err) {
					accept('Error', false);
					Logger.warn(err);
				} else if(!session) {
					accept('No Session', false);
					Logger.warn('No Session found', session);
				} else {
					// User already has an active express session
					if (session.passport.user) {
						data.userId = session.passport.user;
						accept(null, true);
					} else {
						accept('No user found in session', false);
						Logger.warn(session.passport);
						
					}
				}
			});
		} else {
			Logger.warn("No cookie transmitted");
			return accept('No cookie transmitted.', false);
		}
	});

	WS.sockets.on('connection', function(clientSocket) {
		_.extend(clientSocket, new Libs.LeveledEvents());
		self.emit('connection', clientSocket);
		
		clientSocket.on('disconnect', function() {
			// Only trigger the event if user has authenticated
			if (clientSocket.handshake.userId) {
				clientSocket.ltrigger('sectors.disconnect', {internalMessage : true});
				Logger.info('DISCONNECTED - userID ' + clientSocket.handshake.userId);
			} else {
				Logger.info('DISCONNECTED a user with no session');
			}		
		});
		
	});
	
	
	

};
module.exports = new SocketServer(); 
