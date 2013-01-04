var mongoLogger = module.exports = function(db) {
  this.db = db;
};
var prepArguments = function(req, res, command, next, db) {
  command.duration = (new Date).getTime();
  command.query = command.query || {};
  command.fields = command.fields || {};
  command.qOptions = command.qOptions || {};
  this.db = db || this.db;
};

var finalizeStats = function(req, res, command, next, err, result) {
  command.duration = (new Date).getTime() - command.duration;
  command.err = err;
  command.result = result;
  command.resultCount = result.length;
  res.locals.dbCommands = res.locals.dbCommands || [];  
  res.locals.dbCommands.push(command);
  next(err, result);
};

mongoLogger.prototype.dbCommand = function(req, res, command, next, db) {  
  prepArguments.call(this, req, res, command, next, db);
  this.db.collection(command.collection, function(err, coll) {
    if (err) {
      Basbosa('Logger').warn(err);
      throw err;
    }
    

    if (command.name == 'findOne') {
      coll.findOne(command.query, command.qOptions, function(err, result) {
        finalizeStats(req, res, command, next, err, result);
      });
    } else if(command.name == 'find') {
      coll.find(command.query, command.fields, command.qOptions).toArray(function(err, result) {
        var _prepareResults = function(results) {
          if (!results) return null;
  
          results = _.map(results, function(result) {
            result._id = result._id.toString();
            return result;
          });
          
          return results;
        };
        result = _prepareResults(result);
        finalizeStats(req, res, command, next, err, result);
      });      
    }       
  });
};



var handlers = {
    findOne : function(col, command, cb) {
      
    },
    find : function(col, command, cb) {
      
    }
};