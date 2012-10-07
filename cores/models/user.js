if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../../corec/models/user'
	,	'../../corec/models/j'
	, '../config/dummy_users'
	, '../libs/db'
	, './country'
	, 'https'
	, 'http'
  ,	'backbone'
	], function(User, j, DummyUsers, DbClass, Country, https, http) {
	
	
	var UserServer = {
		collectionName 	: 'users',
		
	
		initCoreS	:	function () {
			this.sectors = new Backbone.Collection();
			this.on('change:points', this.pointsChanged, this);
		},
		
		
		authFbUser : function(fbUserData, accessToken, authCb) {
			var self = this;
			this.findOne({fb_user_id: fbUserData.id}, function(err, userJson) {
				if (!userJson) { // if user does not exist in db
					var locationArray = ['', ''], country = new Country(),	user, userData, friends, dataJson, options;
					// Check if the name exist
					if (fbUserData._json.location && fbUserData._json.location.name) {
						locationArray = fbUserData._json.location.name.split(', ')
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
					        // append this chunk to our growing `data` var
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
					    	Logger.debug('Facebook friends:', friends);					    	
					    	url = 'http://graph.facebook.com/' + fbUserData.id + '/picture';
					    	//self.getUserPhoto(url, function(val) {
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
						    	//		times, so we need to check if the user has already been written to db
						    	//		before calling user.create(...)
						    	self.findOne({fb_user_id: fbUserData.id}, function(err, userJsonInternal) {
						    		if (!userJsonInternal) {
						    			Logger.debug('writing user to db - users collection');
						    			user =  new User(userData);
										user.create(function(err) {
											Logger.debug(err);
											authCb(err, user.toJSON());
										});
						    		}
						    	});
						    	
						    	// if country does not exist, add country to countries collection
								// if country exists and city does not exist, add city to cities
								//		array in country doc in countries collection
								country.findOne ({country : userData.location.country}, function (err, countryJson) {
									if (err) {
										Logger.error(err);
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
							  Logger.error(e.message);
						});;
						
					} else {
						authCb(null, userJson);
					}			
			});
		},
		
		/**
		 * @param removeFirst Set to true to get dummy user from beginning of dummy users array
		 * 				useful when stress testing on dev servers to prevent username collision between
		 * 				robot users and dummy auth users 
		 * @param cb called when dummy user has been created
		 */
		getDummy : function(removeFirst, cb) {
			var self = this;
			if (!cb) {
				cb = removeFirst;
				removeFirst = false;
			};
			dummyUser = removeFirst ? DummyUsers.splice(0,1)[0] : DummyUsers.pop();
			// check if such a dummy user already exists in the group
			if (j.group.users.where({username : dummyUser.name}).length) {
				// A user with this name exists, search for another one
				this.getDummy(removeFirst, cb);
				return ;
			}
			self.set({
				username		    : dummyUser.name,
				photo				: '//graph.facebook.com/' + dummyUser.id + '/picture',
				group				: 'visitors',
				lastEntryTime : 0,
				registrationDate : (new Date).getTime()

			});
			self.create(function(err) {
				cb(null, self.toJSON());
			});
		},
		visitsUpdate : function (id, userAgent) {
				var self = this,
				ObjectID = require('mongodb').ObjectID,
				date = (new Date).getTime();
				var Db = DbClass.getDb();
				Db.collection('users', function(err,collection) {
	 	  		 if (err) {
	 		      	Logger.warn('Error while updating lastEntryTime  for user ' + userId, err);
	 		      } else {
	 		      	collection.update({_id: new ObjectID(id)}, {$set : {lastEntryTime : date}},{}, function(err) {});
	 		      }
      	});
      	Db.collection('visits', function(err,collection) {
 	  		 if (err) {
 		      	Logger.warn('Error while updating visits for user ' + userId, err);
 		      } else {
 		      	var document = {userId : new ObjectID(id), stime : date, uagent:JSON.stringify(userAgent), etime: 0, duration : 0};
 		      	collection.insert(document);
 		      }
      	});
		},
		setEndVisitTime : function (userId,lastEntryTime) {
				var model = this;
				var ObjectID = require('mongodb').ObjectID;
				var Db = DbClass.getDb();
				Db.collection('visits', function(err,collection) {
	      if (err) {
	      	Logger.warn('Error while setEnd Visit Time for user ' + userId, err);
	      } else {
					collection.update({userId: new ObjectID(userId), stime: lastEntryTime}, 
									  { $set : {etime :  (new Date).getTime(), duration : ((new Date).getTime() - lastEntryTime)}},
									  {}, function(err) {}
									  );
	      }
	    });
		},
		getVisits : function(Id , callback) {
			var ObjectID = require('mongodb').ObjectID,
					Db = DbClass.getDb(), visits = {}, data = {};
			Db.collection('visits', function(err,collection) {
	      if (err) {
	      	Logger.warn('Error while get Visits for user ', err);
	      } else {
	      	collection.group(
					   {stime: true, uagent: true, etime:true , duration: true}
					   ,{userId: new ObjectID(Id) }
					   ,{}
					   ,function(doc, out){}
					   ,function(err, results) {
					  	 visits = results;
					  	 Db.collection('users', function(err,collection) {
						      if (err) {
						      	Logger.warn('Error while get Visits for user ', err);
						      } else {
						      	collection.group(
										   {registrationDate: true}
										   ,{_id: new ObjectID(Id) }
										   ,{}
										   ,function(doc, out){}
										   ,function(err, results) {
										  	 data.visits = visits;
										  	 data.registrationDate = results[0].registrationDate;
										  	 callback(err, data);
										   }
						      	);
						      }
								});
					   }
	      	);
	      }
			});
			
			
		},
		/**
		 * to get real path of fb user's photo after mapping
		 */
		getUserPhoto : function(url,cb) {									
			http.get(url, function(res) {
				realURL = res['headers']['location'];
				realURL = realURL.substring(5,realURL.length)
				cb(realURL);
			});
		},
		

		pointsChanged : function() {
			var model = this;
			// Do not write dummy users to db
			if (this.get('isDummy')) return;
			var ObjectID = require('mongodb').ObjectID;
			this._withCollection(function(err, collection) {
	      if (err) ;
	      else {
	        var appLog = 'pointsLog', $push = {};
	        $push[appLog] = {	t: (new Date).getTime(), p : model.get('points'), s : new ObjectID(model._lastSectorId)};
	        Logger.debug('before update');
	        collection.update(
	        		{ _id: new ObjectID(model.id.toString()) }, 
	        		{ $set : {points :  model.get('points')},	$push: $push },
	        		//{ $push: $push },
	        		{}, function(err) {}
	        );
	        
	      }
	    });
		},
		
		getLeaders : function(cb, startTime, endTime, sectorId, fbUserId, country, city) {
			startTime = startTime || 0;
			endTime = endTime || (new Date).getTime();
			var ObjectID = require('mongodb').ObjectID;
			var Db = DbClass.getDb();
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
	  
		  var query = {};
		  query['pointsLog' + '.t'] =  {$gt : parseInt(startTime), $lt : parseInt(endTime)}; 
		  if (sectorId) {
		  	query['pointsLog' + '.s'] = new ObjectID(sectorId);
		  }
		  if (country && country != 'world') {
			  if (country == 'friends') {
				  Logger.info('in Friends');
				  var friendsIds;
				  this.findOne({fb_user_id: fbUserId}, function(err, userJson) {
					  if (err) {
						  Logger.error(err);
						  return;
					  }
					  if (!userJson) {
						  Logger.error('user not found...');
						  return;
					  }
					  
					  friendsIds = _.map(userJson.friends, function (item) {
						  return item.fb_user_id;
					  });
					  friendsIds.push(fbUserId);
					  query['fb_user_id'] = {$in : friendsIds};
					  
					  Logger.debug(query);
					  var mr = {
					      mapreduce		: 'users', 
					      map				: mapFn.toString(),
					      out 			: {inline : 1},
					      reduce		: reduceFn.toString(),
					      query 		: query,
					      scope 		: {reqStartTime : startTime, reqEndTime : endTime} 
					  };
				
					  Db.executeDbCommand(mr, function(err, dbres) {
					      var results = dbres.documents[0].results;
					      Logger.debug(err, dbres);
					      cb(err, JSON.stringify(results));
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
			  Logger.debug(query);
			  var mr = {
			      mapreduce		: 'users', 
			      map			: mapFn.toString(),
			      out 			: {inline : 1},
			      reduce		: reduceFn.toString(),
			      query 		: query,
			      scope 		: {reqStartTime : startTime, reqEndTime : endTime}
			  };
		
			  Db.executeDbCommand(mr, function(err, dbres) {
			  	var results = dbres.documents[0].results,
		      	data = _.sortBy(results, function (entry) {
			      // sort result
		      	if (!entry || !entry.value) return 0;
		      		return entry.value.points;
		      	}).reverse();
			  	cb(err, JSON.stringify(data));
			  });
		  }
		}
  };
	
	_.extend(User.prototype, UserServer);
	return User;
	
});