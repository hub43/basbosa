//    backbone-mongodb mongodb-sync.js
//    (c) 2011 Done.
var //_ = require('underscore')._,
    ObjectID = require('mongodb').ObjectID,
    events = require('events'),
    async = require('async'),
    mongoLogger = new (require('./mongo-logger')),
    // Our version of backbone and underscore are already loaded
    //Backbone = require('backbone'),
    //_ = require('underscore')._,
    Db = require('./db');


var Mongo = function(collectionName, model){};
_.extend(Mongo.prototype, {
  
  // Request the Database collection associated with this Document
  _withCollection : function(callback) {
    Db.getDb().collection(this.collectionName, function(err, collection) {
      callback(err, collection);
    });
  }
  
});
Mongo.extend = Backbone.Model.extend;


_.extend(Backbone.Model.prototype, Mongo.prototype, {
  
  dbCommand : function(req, res, command, next) {
    command.collection = this.collectionName;
    mongoLogger.dbCommand(req, res, command, next, Db.getDb());
  },
  //Runs a mongodb find search. 
  // 
  // The callback is constructed from options.error and options.success
  // 
  // @param args: the query json object
  // @params qoptions (optional): additional arguments for query
  // @param callback: the usual backbone success/error callback json
  // @returns: the reseted collection with new models
  find: function(query, qoptions, cb) {
    //if(!options) {
      options = qoptions;
     // qoptions = {};
    //}
    var self = this;
    this._withCollection(function(error, collection) {
      if (error) { 
        return options.error(err); 
      } else {
          collection.find(query, qoptions).toArray(function(err, results) {
            var _prepareResults = function(results) {
              if (!results) return null;
  
              results = _.map(results, function(result) {
                result._id = result._id.toString();
                return result;
              });
              
              return results;
            };
            if (_.isFunction(options)) options(err, _prepareResults(results));
            else if (err) options.error(err);
            else options.success(_prepareResults(results));
          });      
      }
    });
  },
  
  findById : function(id, qOptions, cb) {
    if(!cb) {
      cb = qOptions;
      qOptions = {};
    }
    return this.findOne({ _id: new ObjectID(id)}, qOptions, cb);
  },
  
  
  /**
   * @returns: returns JSON
   */
  findOne: function(query, qOptions, cb) {
    var model = this;
    if(typeof cb !== 'function') {
      cb = qOptions;
      qOptions = {};
    }
    
    this._withCollection(function(err, collection) {
      if (err) { 
        throw err;
        return callback(err); 
      }
      
      var findOneError = new Error('Could not find ' + collection.name + ':' + model.id);
      
      collection.findOne(query, qOptions, function(err, dbModel) {
        
        if (!dbModel) {
          cb(err, null);        
        } else {
          dbModel._id = dbModel._id.toString();
          cb(null, dbModel);
        }
      });      
    });
  },
  /**
   * @returns JSON
   */
  
  /**
   * create
   *    
   * Optional Arguments:
   *    (callback)  A callback function
   *    (models)  An array of models to be created instead of the model calling create
   * In addition to being able to call the method with no or both arguments provided, and calling it with only the callback as argument,
   *  you can also call it with only the array of models as an argument ( i.e. model.create ( [ {...}, {...}, ... ] ) )
   *  and the create method will act accordingly.
   * Actions:
   *    Delete the id given to the model from Backbone
   *    Insert the JSON format of the model to MongoDB
   *    Append the document id assigned by MongoDB to the model
   */
  
  create: function(callback, models) {
    var jsonDocs = [], i;
    if (typeof callback === 'function') {
      models = models || [this];
    } else {
      models = (typeof callback === 'object') ? callback : [this];
    }
    
    models[0]._withCollection(function(err, collection) {
      if (err && typeof callback === 'function') return callback(err);
      for (i = 0; i < models.length; ++i) {
        jsonDocs[i] = models[i].toJSON();
        delete jsonDocs[i]._id;
      }
      collection.insert(jsonDocs, function (err, dbModels) {
        if (err && typeof callback === 'function') callback (err);
        else {
          for (i = 0; i < models.length; ++i) {
            dbModels[i]._id = dbModels[i]._id.toString();
            models[i].set('_id', dbModels[i]._id);
            typeof callback === 'function' && callback (null, dbModels[i]);
          }
        }
      });
  });
  },
  /**
   * @method Update used to update any model attribute ,
   * but before update check if the model have a validate method check it else 
   * call the anonymous function to update the attribute in the db.
   * @returns JSON object contain the validation result if it have some thing wrong or 
   * the model attribute if it is saved well
   */
  update: function(callback) {
    var self = this;
    function __updateDb() {
      self._withCollection(function(error, collection) {
        if(error) {
          typeof callback === 'function' && callback(error);
        } else {
          var attributes = self.toJSON();
          delete attributes._id;
          if(self.id === undefined) {
            collection.insert(attributes, function(error) {
              if(error) {
                Basbosa('Logger').warn('there is error through insertion', error);
              } else {
                typeof callback === 'function' && callback(null, {});
              }
            });
          } else {
            collection.update({ _id: new ObjectID(self.id) }, {$set: attributes}, {safe:true, upsert:false}, function(err) {
              typeof callback === 'function' && callback(null, self.toJSON());
            });
          }
        }
      });
    }
    Basbosa('Logger').debug('This is the model attribute : ', self);
    if(typeof self.validationRules  !== undefined) {
      self.validateUser(function(error, validationError) {
        if(error) {
          Basbosa('Logger').warn('error through validate the model attribute' , error);
        } else {
          if(_.isEmpty(validationError.validationResult)) {
            if(validationError.hashPassword !== undefined) {
              self.set('password', validationError.hashPassword);
              __updateDb();
            }
          } else {
            typeof callback === 'function' && callback(null, validationError.validationResult);
          }
        }
      });
    } else {
      __updateDb();
    }
  },
  
  destroy : function(callback) {
    var model = this;
    
    this._withCollection(function(err, collection) {
      if (err) callback(err);
      else collection.remove({ _id: new ObjectID(model.id) }, callback);
    });    
  },
  
});


