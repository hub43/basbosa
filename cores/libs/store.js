var Express = require('express'),
		MongoStore = require('connect-mongodb');

exports.sessionStore = new MongoStore({db : require('./db').getDb()});
//exports.sessionStore = new Express.session.MemoryStore();