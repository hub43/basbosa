//    backbone-mongodb db.js
//    (c) 2011 Done.

var util = require('util'),
    events = require('events'),
    Mongo = require('mongodb').Db,
    Server = require('mongodb').Server;

var _connection = null, _db = null;

//  Database interface for the MongoDB
//
//  Options hash:
//    name, host, port
//    debug --- TODO: does MongoDB driver support debug?  how much?
//
//  Opens the database and emits an 'open' event on success, or an 'error' event if there was a problem.
var Database = module.exports = function(options) {
  var self = this;
  Basbosa('Logger').debug('Db config' , Config.db);
  _db = new Mongo(Config.db.database, new Server(Config.db.host, Config.db.port, {}));

  // If we have not tried to connect before, try to connect
  if (!_connection) {
  	Basbosa('Logger').debug('Trying to connect');
  	_db.open(function(err, database) {
      if(err) {
      	Basbosa('Logger').warn('Error connecting to db');
      } else {
      	Basbosa('Logger').info('Connected to db ok');
      }
    });
  }
  _connection = _db;
};

//  Returns a connection to the database, or null if the database is not (yet) open
Database.getConnection = function() {
  return _connection;
};
Database.getDb = function() {
  return _db;
};
//
//Support events
util.inherits(Database, events.EventEmitter);

module.exports();