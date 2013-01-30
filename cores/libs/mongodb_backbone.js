//    backbone-mongodb mongodb-sync.js
//    (c) 2011 Done.
var ObjectID = require('mongodb').ObjectID,
    Db = require('./db'),
    Async = require('async');

var BackboneMongoStatic = {
    _withCollection : function(callback) {
      Db.getDb().collection(this.collectionName, function(err, collection) {
        callback(err, collection);
      });
    },
    
    getDb : function() {
      return Db.getDb();
    },
    
    getCollection : function(cb) {
      return this._withCollection(cb);
    },
    
    ensureIndecies : function() {
      var functions = [], indecies = this.indecies, self = this;
      _(indecies).each(function(indexDetails) {
        functions.push(function(next) {
          self.getCollection(function(err, collection) {
            var arr = indexDetails.slice();
            arr.push(next);
            collection.ensureIndex.apply(collection, arr);
          });
        });
      });
      
      Async.parallel(functions, function(err, res) {
        if (err) throw new Error(err);
        //Basbosa('Logger').info(res);
      });      
    },
    
    populateHasMany : function(HasMany, models, cb, res, qOptions) {
      
      var self = this, modelMap = {}, modelIds = [], query = {},
        foreignModelName = HasMany.modelName,  
        foreign_key = HasMany.foreign_key || _(self.collectionName).singularize() + '_id',
        foreignModelNameModel  = foreignModelName + 'Model';
        
      _.each(models, function(model) {
        modelIds.push(model.id);
        modelMap[model.id] = model;
      });
      
      query[foreign_key] = {$in : modelIds};
      
      Basbosa(foreignModelNameModel).search(query,{}, qOptions, function(err, results) {
        _.each(results, function(result) {
          modelMap[result[foreign_key]][foreignModelName] = modelMap[result[foreign_key]][foreignModelName] || [];
          modelMap[result[foreign_key]][foreignModelName].push(result);
        });
        
        cb(err, results);
        
      }, res);
     
    },
    
    populateBelongsTo : function(BelongsTo, models, cb, res) {
      var modelIds = [], query = {}, modelMap = {},
        foreignModelName = BelongsTo.modelName,
        local_foreign_key = BelongsTo.local_foreign_key || foreignModelName.toLowerCase() + '_id';
           
      _.each(models, function(model) {
        modelIds.push(model[local_foreign_key]);
        //modelMap[model[local_foreign_key]] = model;
      });
         
      query['id'] = {$in : modelIds};
        
      Basbosa(foreignModelName + 'Model').search(query, function(err, results) {

        _.each(results, function(result) {
          modelMap[result.id] = result;
        });
        
        _.each(models, function(model) {
          model[foreignModelName] = modelMap[model[local_foreign_key]];
        });    
        
        cb(err, results);
      }, res);
      
    },
    
    fetchContained : function(contains, models, completed, res) {
      var functions = [], self = this, allowedRelations = ['HasMany', 'BelongsTo'];
      _.each(contains, function(relations, relationType) {
        if (allowedRelations.indexOf(relationType) === -1) return;
        _.each(relations, function(ModelContains, ModelName) {
          functions.push(function(next) {
            var relation = {}, qOptions = ModelContains.qOptions || {};
            relation = {
                modelName : ModelName,
                local_foreign_key : relations[ModelName].local_foreign_key,
                foreign_key : relations[ModelName].foreign_key
            };
            self['populate' + relationType](relation, models, function(err, results) {
              Basbosa(ModelName + 'Model').fetchContained(ModelContains, results, next, res);
            }, res, qOptions);
          });
           
        });
      });
      
      Async.parallel(functions, function(err) {
        completed(err, models);
      });
      
    },
    
    
    
    /*
     *Possible ways to pass parameters
     * cb
     * cb, res
     * query, cb
     * query, cb, res
     * query, fields, cb
     * query, fields, cb, res
     * query, fields, qOptions, cb
     * query fields, qOptions, cb, res
     *  
     * @param query
     * @param fields
     * @param qOptions
     * @param cb
     * @param res
     */
    search : function() {
      var dbCommand, query, fields, qOptions, cb, res, contains,
        args = Array.prototype.slice.call(arguments, 0), self = this;
      
      query = typeof args[0] === 'object' ?  args[0] : {};
      fields = args.length >= 3 && typeof args[1] === 'object' ? args[1] : {};
      qOptions = args.length >= 4 && typeof args[2] === 'object' ? args[2] : {};
      contains = qOptions.contains || {};
      delete qOptions.contains;
      
      res = args.pop();
      // If the last parameter is an object, log the query to it
      if (typeof res === 'object') {
        res.locals = res.locals || {}; 
        res.locals.dbCommands = res.locals.dbCommands || [];
        
        dbCommand = {
            collection : this.collectionName,
            name : 'find',
            query : query,
            fields : fields,
            qOptions : qOptions,
            duration : (new Date).getTime()
          };
        
        // Remove original call back
        cb = args.pop();
      } else {
        cb = res;
      }
        
      this._withCollection(function(error, collection) {
        if (error) { 
          return cb(error, null); 
        } else {
          collection.find(query, fields, qOptions).toArray(function(err, results) {
            if (err) return cb(err, results);
                     
            results = _.map(results, function(result) {
              result._id = result._id.toString();
              return result;
            });
            
            // If a response was sent, log to it;
            if (typeof res === 'object') {
              dbCommand.duration = (new Date).getTime() - dbCommand.duration;
              dbCommand.result = results;
              dbCommand.resultCount = results.length;
              dbCommand.err = err;
              res.locals.dbCommands.push(dbCommand);
            }
            
            self.fetchContained(contains, results, function(err) {
              cb(err, results);
            }, res);
                     
          });      
        }
      });
    },
    
    /*
     *  
     * @param query
     * @param qOptions
     * @param cb
     * @param res
     */
    searchOne : function(query, qOptions,  cb, res) {
      if (typeof qOptions === 'function') {
        res = cb;
        cb = qOptions;
        qOptions = {};
      }
      
      qOptions.limit = 1;
      
      return this.search(query, {}, qOptions, function(err, results) {
        cb(err, results.pop());
      }, res);
    }

};
var BackboneMongo;
BackboneMongo = {

    idAttribute:"_id",

    //Runs a mongodb find search.
    //
    // The callback is constructed from options.error and options.success
    //
    // @param args: the query json object
    // @params qoptions (optional): additional arguments for query
    // @param callback: the usual backbone success/error callback json
    // @returns: the reseted collection with new models
    find:function (query, qOptions, cb) {
        if (typeof query === 'function') cb = query;
        if (typeof qoptions === 'function') cb = qOptions;

        var self = this;
        this._withCollection(function (error, collection) {
            if (error) {
                return options.error(err);
            } else {
                collection.find(query, qoptions).toArray(function (err, results) {
                    var _prepareResults = function (results) {
                        if (!results) return null;

                        results = _.map(results, function (result) {
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

    findById:function (id, qOptions, cb) {
        if (!cb) {
            cb = qOptions;
            qOptions = {};
        }
        return this.findOne({ _id:new ObjectID(id)}, qOptions, cb);
    },


    /**
     * @returns: returns JSON
     */
    findOne:function (query, qOptions, cb) {
        var model = this;
        if (typeof cb !== 'function') {
            cb = qOptions;
            qOptions = {};
        }

        this._withCollection(function (err, collection) {
            if (err) {
                throw err;
                return callback(err);
            }

            var findOneError = new Error('Could not find ' + collection.name + ':' + model.id);

            collection.findOne(query, qOptions, function (err, dbModel) {

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

    create:function (callback, models) {
        var jsonDocs = [], i;
        if (typeof callback === 'function') {
            models = models || [this];
        } else {
            models = (typeof callback === 'object') ? callback : [this];
        }

        models[0]._withCollection(function (err, collection) {
            if (err && typeof callback === 'function') return callback(err);
            for (i = 0; i < models.length; ++i) {
                jsonDocs[i] = models[i].toJSON();
                delete jsonDocs[i]._id;
            }
            collection.insert(jsonDocs, function (err, dbModels) {
                if (err && typeof callback === 'function') callback(err);
                else {
                    for (i = 0; i < models.length; ++i) {
                        dbModels[i]._id = dbModels[i]._id.toString();
                        models[i].set('_id', dbModels[i]._id);
                        typeof callback === 'function' && callback(null, dbModels[i]);
                    }
                }
            });
        });
    },

    saveDb:function (cb) {
        var self = this;
        this.constructor.getCollection(function (error, collection) {
            if (self.get('_id')) {
                var ob = self.toJSON();
                delete ob._id;
                return collection.update({_id:new ObjectID(self.get('_id'))}, {$set:ob}, {upsert : true}, cb);
            }
            collection.insert(self.toJSON(), function (err, result) {
              if (!err && result) {   
                result = result.pop();
                self.set('_id', result._id.toString());
              }
              
              cb(err, result);
            });
        });
    },

    saveDbField:function (field, cb) {
        var self = this, update = {$set:{}};
        update.$set[field] = new ObjectID(this.get(field));
        if (field.indexOf('_id') > -1) {
            update.$set[field] = new ObjectID(this.get(field));
        } else {
            update.$set[field] = this.get(field);
        }

        this.constructor.getCollection(function (error, collection) {
            collection.update({_id:new ObjectID(self.id)}, update, cb);
        });

    },
    /**
     * @method Update used to update any model attribute ,
     * but before update check if the model have a validate method check it else
     * call the anonymous function to update the attribute in the db.
     * @returns JSON object contain the validation result if it have some thing wrong or
     * the model attribute if it is saved well
     */
    update:function (callback) {
        var self = this  , attributes = self.toJSON();
        ;
        function __updateDb() {
            self._withCollection(function (error, collection) {
                if (error) {
                    typeof callback === 'function' && callback(error);
                } else {
                    delete attributes._id;
                    if (self.id === undefined) {
                        collection.insert(attributes, function (error) {
                            if (error) {
                                Basbosa('Logger').warn('there is error through insertion', error);
                            } else {
                                typeof callback === 'function' && callback(null, {});
                            }
                        });
                    } else {
                        collection.update({ _id:new ObjectID(self.id) }, {$set:attributes}, {safe:true, upsert:false}, function (err) {
                            typeof callback === 'function' && callback(null, self.toJSON());
                        });
                    }
                }
            });
        }

        Basbosa('Logger').debug('This is the model attribute : ', self);
        if (typeof self.validationRules !== undefined) {
            self.validateUser(function (error, result) {
                Basbosa('Logger').warn(error, result);
                if (error !== null) {
                    typeof callback === 'function' && callback(null, error);
                } else if (result) {
                    if (self.prepareUserToUpdate !== undefined) {
                        self.prepareUserToUpdate();
                        __updateDb();
                    } else {
                        typeof callback === 'function' && callback('There is no method called prepareUserToUpdate in this user');
                    }
                }
            });
        } else {
            __updateDb();
        }
    },

    destroy:function (callback) {
        var model = this;

        this._withCollection(function (err, collection) {
            if (err) callback(err);
            else collection.remove({ _id:new ObjectID(model.id) }, callback);
        });
    }

};

var AutoModels;
AutoModels = {
    initModels:function () {
        var self = this;
        Db.getDb().collectionNames(function (err, results) {
            _(results).each(function (collection) {
                var collectionName = collection.name.split('.').pop(),
                    className = _(_(collectionName).singularize()).classify();
                if (!Basbosa(className + 'Model')) {
                    self.createClass(className, collectionName);
                }

                if (!Basbosa(className + 'Model').collectionName) {
                    Basbosa(className + 'Model').collectionName = collectionName;
                }

                Basbosa(className + 'Model').ensureIndecies();

                if (typeof Basbosa(className + 'Model').initClass === 'function') {
                    Basbosa(className + 'Model').initClass();
                }

            });
            Db.emit('modelsReady');
            Basbosa('Logger').debug('Emitted models ready');
        });
    },

    createClass:function (className, collectionName) {
        var newClass = Backbone.Model.extend({}, {
            collectionName:collectionName,
        });

        Basbosa.add(className + 'Model', newClass);
    }
};

Backbone.Model = Backbone.Model.extend(BackboneMongo, BackboneMongoStatic);

Db.on('connected', function() {
  AutoModels.initModels();
});

module.exports.BackboneMongo = BackboneMongo;
module.exports.BackboneMongoStatic = BackboneMongoStatic;
module.exports.AutoModels = AutoModels;
Basbosa.add('BackboneMongo', BackboneMongo);
Basbosa.add('ObjectID', ObjectID);
