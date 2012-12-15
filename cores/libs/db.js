var MongoClient = require('mongodb').MongoClient
  , Server = require('mongodb').Server
  , EventEmitter = require('events').EventEmitter;

var Database = function() {
  //this.config = Basbosa('Config').db;
  this.config = Config.db;
};

/**
 * Inherits from EventEmitter.
 */

Database.prototype.__proto__ = EventEmitter.prototype;

Database.prototype.connect = function() {
  var mongoClient, self = this;
  mongoClient = new MongoClient(new Server(self.config.host, self.config.port));
  mongoClient.open(function(err, mongoClient) {
    self.db = mongoClient.db(self.config.database);
    self.emit('connected');
    mongoClient.close();
  });
};

Database.prototype.getDb = function() {
  return this.db;
};
module.exports = new Database();