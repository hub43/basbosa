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
	WS.set('log level', Basbosa('Config').get('logging'));
	WS.set('transports', [ 'websocket', 'htmlfile',
			'xhr-polling', 'jsonp-polling' ]);
	
	WS.set('transports', ['websocket', 'xhr-polling']);

	WS.set('authorization', function(data, accept) {
		if (Basbosa('Config').get('skipSocketAuth')) {
			Basbosa('Logger').info('Session accepted in skipAuth Mode');
			accept(null, true);
			return ;
		}
		if (data.headers.cookie) {
			data.cookie = cookie.parse(data.headers.cookie);
			data.sessionID = data.cookie['express.sid'].replace('s:', '').split('.')[0];
			// get the session data from the session store
			Basbosa('Logger').debug('trying to get sesseion for sessionid ' +  data.sessionID);
			Store.sessionStore.get(data.sessionID, function(err, session) {
				if (err) {
					accept('Error', false);
					Basbosa('Logger').warn(err);
				} else if(!session) {
					accept('No Session', false);
					Basbosa('Logger').warn('No Session found', session);
				} else {
					// User already has an active express session
					// Add user socket data
					Store.socketsData.add(data, data.sessionID);
					if (session.passport.user) {
						data.userId = session.passport.user;
						accept(null, true);
					} else {
						accept(null, true);
						//accept('No user found in session', false);
						Basbosa('Logger').warn('No user found in session');
					}
				}
			});
		} else {
			Basbosa('Logger').warn("No cookie transmitted");
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
				Basbosa('Logger').info('DISCONNECTED - userID ' + clientSocket.handshake.userId);
			} else {
				Basbosa('Logger').info('DISCONNECTED a user with no session');
			}		
		});

		clientSocket.on('message', function(message) {
			this.ltrigger(message.eventName, message);
		});
		
	});
};
module.exports = new SocketServer(); 
