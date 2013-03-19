var Express = require('express'),
		MongoStore = require('connect-mongodb');

exports.sessionStore = new MongoStore({url : Basbosa('Cm').getDbUrl('default')});

exports.socketsData = {
  sockets : {},
  add : function(socket, sessionId) {
    exports.socketsData.sockets[sessionId] = socket;
  },
  get : function(sessionId) {
    return exports.socketsData.sockets[sessionId];
  }
};