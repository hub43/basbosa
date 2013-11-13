var Express = require('express'),
		MongoStore = require('connect-mongodb');

var sessionDbUrl = Basbosa('Cm').getDbUrl(Basbosa('Config').get('sessionDbConfig'));
Basbosa('Logger').trace('Using this connection for sessions store' + sessionDbUrl);
exports.sessionStore = new MongoStore({url : sessionDbUrl});

exports.socketsData = {
  sockets : {},
  add : function(socket, sessionId) {
    exports.socketsData.sockets[sessionId] = socket;
  },
  get : function(sessionId) {
    return exports.socketsData.sockets[sessionId];
  }
};