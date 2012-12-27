/**
 * User Model provide the core of handling all operation that related 
 * to the users {authentication, getDummy, update , set and get to/from data base "users collection" } 
 * @module Cores
 * @submodule CoresModels
 * @class User
 * @property collectionName hold the name of the collection.
 **/
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../../corec/models/user'
	,	'../../corec/models/j'
	, '../config/dummy_users'
	, '../libs/db'
	, './country'
	, 'https'
	, 'http'
	, '../libs/email_module'
	, '../libs/validations_module'
	, 'async'
  ,	'backbone'
	], function(User, j, DummyUsers, DbClass, Country, https, http, email, Validations, Async) { //user Model inherent from user and j in corec.
	
	var UserServer = {
		mailMessage : {
			text : 'some thing',
			from : 'nobody@hub43.com',
			to 	 : 'nfutoam.atef@gmail.com',
			subject : 'Welcome to hub43.com',
			attachment: 
			      {data:"<html>i <i>hope</i> this works!</html>", alternative:true}
		},
		status : null,
		collectionName 	: 'users',  																		//define the collection that this class will deal with it.
		/**
		 * initCoreS is a method called directly when defined an instance from user model
		 * @method initCoreS
		 */
		initCoreS	:	function () {
			this.sectors = new Backbone.Collection();
			this.on('change:points', this.pointsChanged, this);
		},
		 /**
		 * AuthFbUser is a method responsible on authenticate the Facebock user
		 * and check if the user is exist in data base else insert he/she to data base.
		 * @method authFbUser
		 * @param {Object} fbUserData user data  {ID , username , photo,...}
		 * @param {Function} authCb(error, userJson) A callback function on the User object
		 */
		authFbUser : function(fbUserData, accessToken, authCb) {
			var self = this;
			this.findOne({fb_user_id: fbUserData.id}, function(error, userJson) {
				if (!userJson) { // if user does not exist in db
					var locationArray = ['', ''], country = new Country(),	user, userData, friends, dataJson, options;
					// Check if the name exist
					if (fbUserData._json.location && fbUserData._json.location.name) {
						locationArray = fbUserData._json.location.name.split(', ');
					}
					// get user's Facebook friends
					options = {
						host: 'graph.facebook.com',
						path: '/' + fbUserData.id + '/friends?access_token=' + accessToken
					};

					https.get(options, function (http_res) {
						dataJson = '';
				    // this event fires many times, each time collecting another piece of the response
				    http_res.on('data', function (chunk) {
				        // append this chunk to our growing `data`
				        dataJson += chunk;
				    });
				    // this event fires *one* time, after all the `data` events/chunks have been gathered
				    http_res.on('end', function () {
				    	dataJson = eval('(' + dataJson + ')');
				    	friends = _.map(dataJson.data, function(item) {
				    		var friend = {};
				    		friend.fb_user_id = item.id;
				    		return friend;
				    	});
				    	Basbosa('Logger').debug('Facebook friends:', friends);					    	
				    	url = 'http://graph.facebook.com/' + fbUserData.id + '/picture';
		    		 	var photo = url;					    										    						  
				    	// prepare user data to write to db
				    	userData = {
								fb_user_id 		: fbUserData.id,
								username		:	fbUserData._json.name ,
								emails			: [fbUserData._json.email],
								photo				: photo,
								group				: 'visitors',
								location		: {
									city			:	locationArray[0],
									country		:	locationArray[1]
								},
								friends			: friends,
								lastEntryTime 	: 0,
								registrationDate : (new Date).getTime()
							}; 
							// add user to users collection
				    	// for some reason this function handling the 'end' event is called multiple
				    	// times, so we need to check if the user has already been written to db
				    	// before calling user.create(...)
				    	self.findOne({fb_user_id: fbUserData.id}, function(error, userJsonInternal) {
				    		if (!userJsonInternal) {
				    			Basbosa('Logger').debug('writing user to db - users collection');
				    			user =  new User(userData);
									user.create(function(error) {
										Basbosa('Logger').debug(error);
										authCb(error, user.toJSON());
									});
				    		}
				    	});
				    	// if country does not exist, add country to countries collection
							// if country exists and city does not exist, add city to cities
							// array in country doc in countries collection
							country.findOne ({country : userData.location.country}, function (error, countryJson) {
								if (error) {
									Basbosa('Logger').error(error);
									return;
								}
								if (!countryJson) {
									country.set('country', userData.location.country);
									country.set('cities', [userData.location.city]);
									country.create();
								} else if (countryJson.cities.indexOf(userData.location.city) == -1) {
									country.addCity(countryJson.country, userData.location.city);
								}
							});
							http_res.on('end', function () {});
						});
					}).on('error', function(e) {
						  Basbosa('Logger').error(e.message);
					});
				} else {
					authCb(null, userJson);
				}			
			});
		},
		
		/**
		 * @method getDummy is a method Authenticate dummy users
		 * @param {Boolean} removeFirst Set to true to get dummy user from beginning of dummy users array
		 * 				useful when stress testing on dev servers to prevent username collision between
		 * 				robot users and dummy auth users 
		 * @param {Function} callback(error, user) called when dummy user has been created
		 */
		getDummy : function(removeFirst, callback) {
			var self = this;
			if (!callback) {
				callback = removeFirst;
				removeFirst = false;
			};
			dummyUser = removeFirst ? DummyUsers.splice(0,1)[0] : DummyUsers.pop();
			if(j.group !== undefined) {
				// check if such a dummy user already exists in the group
				if (j.group.users.where({username : dummyUser.name}).length) {
					// A user with this name exists, search for another one
					this.getDummy(removeFirst, callback);
					return ;
				}
			}
			self.set({
				username		    : dummyUser.name,
				photo				: '//graph.facebook.com/' + dummyUser.id + '/picture',
				group				: 'visitors',
				lastEntryTime : 0,
				registrationDate : (new Date).getTime()
			});
			self.create(function(error) {
				callback(null, self.toJSON());
			});
		},
		/**
		 * @method visitsUpdate is a method called for the first time of user's entering 
		 * create visits collection to hold all visits log of this user ,set last entering time.
		 * @param {String} userAgent hold user agent information like 
		 * {"family":"Chrome","major":"22","minor":"0","patch":"1229","os":"Windows 7"}
		 * @param {String} id hold user id .
		 * @param {Function} callback(error, user) called when dummy user has been created.
		 */
		visitsUpdate : function (id, userAgent) {
			
			var self = this,
			ObjectID = require('mongodb').ObjectID,
			date = (new Date).getTime();
			var Db = DbClass.getDb();
			Db.collection('users', function(error,collection) {
  		 if (error) {
	      	Basbosa('Logger').warn('Error while updating lastEntryTime  for user ' + userId, error);
	      } else {
	      	collection.update({_id: new ObjectID(id)}, {$set : {lastEntryTime : date}},{}, function(err) {});
	      }
    	});
    	Db.collection('visits', function(error,collection) {
  		 if (error) {
	      	Basbosa('Logger').warn('Error while updating visits for user ' + userId, error);
	      } else {
	      	var document = {userId : new ObjectID(id), stime : date, uagent:JSON.stringify(userAgent), etime: 0, duration : 0};
	      	collection.insert(document, function(err){
	      	  
	      	});
	      }
    	});
		},
		/**
		 * @method setEndVisitTime is a method used to set end time attribute in visits collection
		 * create visits collection to hold all visits log of this user ,set last entering time.
		 * @param {String} userId hold user id.
		 * @param {TimeStamp} lastEntryTime hold user's last entering time, 
		 * used to search on the user that has start time equal lastEntryTime.
		 */
		setEndVisitTime : function (userId, lastEntryTime) {
			var ObjectID = require('mongodb').ObjectID
				, Db = DbClass.getDb();
			Db.collection('visits', function(error,collection) {
	      if (error) {
	      	Basbosa('Logger').warn('Error while setEnd Visit Time for user ' + userId, error);
	      } else {
					collection.update({userId: new ObjectID(userId), stime: lastEntryTime}, 
									  { $set : {etime :  (new Date).getTime(), duration : ((new Date).getTime() - lastEntryTime)}},
									  {}, function(error) {}
				  );
	      }
			});
		},		
		/**
		 * @method getUserPhoto is a method used to get real path of fb user's photo after mapping.
		 * @param {String} url hold user's photo url that redirect to the real url.
		 * @param {Function} callback(realURL) callback function return the real url.
		 */
		getUserPhoto : function(url,callback) {									
			http.get(url, function(res) {
				realURL = res['headers']['location'];
				realURL = realURL.substring(5, realURL.length)
				callback(realURL);
			});
		},
		/**
		 * @method pointsChanged is a method used to update the users points in data base.
		 */
		pointsChanged : function() {
			var model = this;
			// Do not write dummy users to db
			if (this.get('isDummy')) return;
			var ObjectID = require('mongodb').ObjectID;
			this._withCollection(function(error, collection) {
	      if (error) {
	      	Basbosa('Logger').warn('Error while changing users points ', error);
	      } else {
	        var appLog = 'pointsLog', $push = {};
	        $push[appLog] = {	t: (new Date).getTime(), p : model.get('points'), s : new ObjectID(model._lastSectorId)};
	        Basbosa('Logger').debug('before update');
	        collection.update(
	        		{ _id: new ObjectID(model.id.toString()) }, 
	        		{ $set : {points :  model.get('points')},	$push: $push },
	        		//{ $push: $push },
	        		{}, function(error) {}
	        ); 
	      }
	    });
		},
		/**
		 * @method getLeaders is a method used to get all users and his/her points/score in order.
		 * @param {Function} callback(error, data/results) callback function return users's usernames and scores ordered.
		 * @param {TimeStamp} startTime hold the start of the range time that users entered in it.
		 * @param {TimeStamp} endTime hold the end of the range time that users entered in it.
		 * @param {String} sectorId hold sector id that the user we need joined to it.
		 * @param {String} fbUserId hold Facebook user ID
		 * @param {String} country hold country that the users we need from it
		 * @param {String} city hold city that the users we need from it
		 */
		getLeaders : function(callback, startTime, endTime, sectorId, fbUserId, country, city) {
			startTime = startTime || 0;
			endTime = endTime || (new Date).getTime();
			var ObjectID = require('mongodb').ObjectID
				, Db = DbClass.getDb();
			//map function that indicate which attribute will group by it.
			// used to order the users related to his/her scores.
			var mapFn = function() {
			var maxTime = { t : 0, p : 0}, minTime ={t : (new Date).getTime(), p : 0};
				this.pointsLog.forEach(function(log) {
					if (log.t < reqStartTime || log.t > reqEndTime) return;
					log.t > maxTime.t && (maxTime = log);
					log.t < minTime.t && (minTime = log);
				});
				emit(this._id,  {
					username 	: this.username,
					photo		: this.photo,
					startTime	: minTime.t,
					endTime 	: minTime.t,
					startPoints : minTime.p,
					endPoints 	: maxTime.p,
					points		: maxTime.p - minTime.p + 1,
				});
			};
			var reduceFn = function(key, values) {
				return {_id : key, values : values};
			};
			//condition of search in data base.
		  var query = {};
		  query['pointsLog' + '.t'] =  {$gt : parseInt(startTime), $lt : parseInt(endTime)}; 
		  if (sectorId) {
		  	query['pointsLog' + '.s'] = new ObjectID(sectorId);
		  }
		  if (country && country != 'world') {
			  if (country == 'friends') {
				  Basbosa('Logger').info('in Friends');
				  var friendsIds;
				  this.findOne({fb_user_id: fbUserId}, function(error, userJson) {
					  if (error) {
						  Basbosa('Logger').error(error);
						  return;
					  }
					  if (!userJson) {
						  Basbosa('Logger').error('user not found...');
						  return;
					  }
					  
					  friendsIds = _.map(userJson.friends, function (item) {
						  return item.fb_user_id;
					  });
					  friendsIds.push(fbUserId);
					  query['fb_user_id'] = {$in : friendsIds};
					  Basbosa('Logger').debug(query);
					  var mr = {
					      mapreduce		: 'users', 
					      map				: mapFn.toString(),
					      out 			: {inline : 1},
					      reduce		: reduceFn.toString(),
					      query 		: query,
					      scope 		: {reqStartTime : startTime, reqEndTime : endTime} 
					  };
					  Db.executeDbCommand(mr, function(error, dbres) {
					      var results = dbres.documents[0].results;
					      Basbosa('Logger').debug(error, dbres);
					      callback(error, JSON.stringify(results));
					  });
					  
				  });
				  
			  } else {
				  query['location.country'] = country;
				  if (city && city != 'cities') {
					  query['location.city'] = city;
				  }
			  }
		  }
		  if (country != 'friends') {
			  Basbosa('Logger').debug(query);
			  var mr = {
		      mapreduce		: 'users', 
		      map			: mapFn.toString(),
		      out 			: {inline : 1},
		      reduce		: reduceFn.toString(),
		      query 		: query,
		      scope 		: {reqStartTime : startTime, reqEndTime : endTime}
			  };
			  Db.executeDbCommand(mr, function(error, dbres) {
			  	var results = dbres.documents[0].results,
		      		data = _.sortBy(results, function (entry) {	
			      		// sort result
			      		if (!entry || !entry.value) return 0;
			      		return entry.value.points;
		      		}).reverse();
			  	callback(error, JSON.stringify(data));
			  });
		  }
		},
		validateUser : function(callback) {
			var self = this, validationError = {}, hashPassword, options = {}
			, attributes = self.toJSON(), token, rulesFunctions = [];
			//check if this user has validationRules object if not return true and do nothing.
			if(self.validationRules === undefined) {
				if(callback !== undefined && callback === 'function') callback(null, {});
				return true;
			} else {
				// if validationRules object is exist in this user loop on it 
				//and push in rulesFunctions with the parameters of them.
				_.each(self.validationRules, function(rules, fieldName) {
					if (self.get(fieldName) !== undefined) {
						_.each(rules, function(rule) {
							if(fieldName === 'password') {
								rulesFunctions.push(function(cb) {
									rule.rule(self.get(fieldName), 6, function(result) {
										if(!result)	cb(rule.message);
										if(result)	cb(null, true);
									})
								});
							} else {
								rulesFunctions.push(function(cb) {
									rule.rule(self.get(fieldName), function(result) {
										if(!result)	cb(rule.message);
										if(result)	cb(null, true);
									})
								});
							}
						});
					}
				});
				//Async execution depending on the callback check on the database or not.
				Async.parallel(rulesFunctions, function(error, result) {
					if(error) {
						validationError = _.extend({}, validationError, error);
						typeof callback === 'function' && callback(null, validationError);
					}
					if(result) {
						options.success = function (results) {
							Basbosa('Logger').debug('The result of checking in db if this data there exsit before', results);
							if(_.isEmpty(results))  {
								hashPassword = self.hash(self.get('password'));
								attributes.token = self.generateActivationToken(self.get('email'));
								self.set(attributes);
								self.mailMessage.attachment.data = self.prepareMailContent({ url: Basbosa('Config').get('webRoot') + '/activate?email=' +  self.get('email') + '&token=' + attributes.token});
								self.mailMessage.to =	self.get('email');
								email.sendMail(self.mailMessage);
								self.set('status', 'pending_activation');
								Basbosa('Logger').debug('this user is :' + 'pending_activation');
							} else {
								validationError['dbValidation'] = 'This account exist before';
							}
							typeof callback === 'function' && callback (null, {validationResult : validationError, hashPassword : hashPassword});	
						};
						options.error = function (error) {
							typeof callback === 'function' && callback (error, validationError);
						};
						self.find({email: self.get('email')}, options);
					}
			  });
			  
			}
		},
		hash : function(string) {
			var crypto = require('crypto');
			return crypto.createHmac('sha1', Basbosa('Config').get('salt').toString()).update(string).digest('hex');
		},
		generateActivationToken : function(email) {
			var self =  this;
			return self.hash((new Date).getTime() + email);
		},
		auth : function(user, callback) {
			var self = this;
			function __userPendingActivation() {
				self.findOne({email: user.username, password: self.hash(user.password)}, function(error, user) {
					if(error) {
						Basbosa('Logger').debug('error', error);
						callback(error);
					} else {
						if(_.isEmpty(user)) {
							callback(null, false, {message: 'Incorrect user name or password. Please try again.'});
						} else {
							callback(null, false, {message:	'This account is not activated.' + 
								' Please follow the instructions in the confirmation email to activate your account.'});
						}
					}
				});
			}
			self.findOne({email: user.username, password: self.hash(user.password), 
				status: Basbosa('Config').get('userAfterAct')}, function(error, result) {
					if(error) {
						Basbosa('Logger').debug('Error when check if the user is exist', error);
						callback(error);
					} else {
						if(_.isEmpty(result)) {
							Basbosa('Logger').debug("This user didn't exist before");
							__userPendingActivation();
						} else {
							callback(null, result);
						}
					}
			});
		}
  };
	
	_.extend(User.prototype, UserServer);
	return User;
	
});