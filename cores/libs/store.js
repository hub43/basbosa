var Express = require('express'),
		MongoStore = require('connect-mongodb');

// 
var Server = require('mongodb').Server;
var con = Basbosa('Config').get('db');
var server_config = new Server(con.host, con.port, {auto_reconnect: true, native_parser: true});
exports.sessionStore = new MongoStore({server_config : server_config, dbname : con.database});

exports.socketsData = {
		sockets : {},
		add : function(socket, sessionId) {
			exports.socketsData.sockets[sessionId] = socket;
		},
		get : function(sessionId) {
			return exports.socketsData.sockets[sessionId];
		}
		
};
//exports.sessionStore = new Express.session.MemoryStore();

