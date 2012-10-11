/**
 * Analytics Model provide the core of handling analytics engine [getActiveUsers,getSessionLengths, getVisitStats ] 
 * @module Cores
 * @submodule CoresModels
 * @class Analytics
 * @property collectionName hold the name of the collection.
 **/
if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define([ '../libs/db', 'backbone' ], function(DbClass) {
	//define Analytics Model
	var Analytics = Backbone.Model.extend({
	  collectionName : 'users',									//define the collection that this class will deal with it.
	  /**
		 * Search is a method get all users from the data base if username come with null value else
		 * get the users that the first characters of it's usernames is matched .
		 * @method search
		 * @param {String} username It is the first characters of the users that need to search on it 
		 * @param {Function} callback A callback function on the Analytics object
		 */
	  search : function(username, callback) {		
	  	var query = username + '*', options = {}; 
	  	options.success = function (results) {	// callback function in success case
	  		callback (null, results);
			};
			options.error = function (err) {				// callback function in error case
				callback (err);
			};
			username == '' ? this.find({username : {$regex : 'l*', $options: 'i' }}, options) : this.find({
				username : {$regex : query, $options: 'i' }}, options);   
	  },
	  /**
		 * GetActiveUsers is a method get number of the users that enter 
		 * the game in between range of time {start time , end time }
		 * @method getActiveUsers
		 * @param {TimeStamp} startTime  
		 * @param {TimeStamp} endTime 
		 * @param {Function} callback A callback function on the Analytics object
		 */
	  getActiveUsers : function(startTime, endTime, callback) {
	  	var milliSecondsInADay = 86400000
	  	, numberOfDays = ((endTime + milliSecondsInADay) - startTime)/milliSecondsInADay
	  	, SecondInDay = 86399000, Db = DbClass.getDb();
	  	var dataArray = [ ['Date', 'getActiveUsers'] ];
	  	Db.collection('visits', function(err,collection) {
	  		 if (err) {
		      	Logger.warn('Error while get active users ', err);
		      } else {
						collection.group(
						   {userId : true, stime: true}
						   ,{stime: {$gte : parseInt(startTime), $lt: parseInt(endTime + milliSecondsInADay)}}
						   ,{ count: 0}
						   ,function(doc, out){ out.count++; }
						   ,function(err, results) {
						  	 Logger.info(numberOfDays);
						  	 for (var j = 0; j < numberOfDays; j++) {
						  		 var count = 0;
						  		 var previousId = 0;
						  		 for(var i = 0; i < results.length; i++) {
						  			 if(previousId != results[i].userId) {
								  		 if (results[i].stime >= startTime && results[i].stime <= (startTime + SecondInDay)) {
								  				 	count += 1;
								  		 }
						  			 }
							  		 previousId = results[i].userId;
							  	 }
						  		 dataArray.push ( [ new Date(startTime).toLocaleDateString(), count]);
						  		 startTime = (startTime + milliSecondsInADay);
						  	 }
						  	 callback(err, dataArray);
						   }
					   );
		      }
	  	});
	  },
	  /**
		 * GetSessionLengths is a method return ranges of the sessions length 
		 * and how many users have this sessions length in range of time {start time , end time}
		 * @method getSessionLengths
		 * @param {TimeStamp} startTime  
		 * @param {TimeStamp} endTime 
		 * @param {Function} callback A callback function on the Analytics object
		 */
	  getSessionLengths : function(startTime, endTime, callback) {
		  if (typeof startTime === 'function') {
		  	callback = startTime;
			  startTime = 0;
			  endTime = new Date().getTime;
		  }
		  var milliSecondsInADay = 86400000,
  		getMinutes = 3600000;
			var Db = DbClass.getDb();
			Db.collection('visits', function(err,collection) {
				 if (err) {
		      	Logger.warn('Error while get session lengths ', err);
		      } else {
						collection.group(
						   {duration : true}
						   ,{stime: {$gte : parseInt(startTime), $lt: parseInt(endTime + milliSecondsInADay)}}
						   ,{ count: 0}
						   ,function(doc, out){ out.count++; }
						   ,function(err, results) {
						  	 var ranges = [ [ 0, 1 ], [ 2, 5 ], [ 6, 15 ], [ 16, 30 ], [ 31, 60 ],[ 61, 120 ], [ 121, 240 ], [ 241 ] ],
						  	 		 countInRanges = [0, 0, 0, 0, 0, 0, 0, 0],
						  	 		 dataArray = [ ];
						  	 results.forEach (function (entry) {
						  		 for (i = 0; i < ranges.length; ++i) {
						  			 	if (ranges[i].length == 2 && (entry.duration/getMinutes) >= ranges[i][0] && (entry.duration/getMinutes) <= ranges[i][1]) {
										  	countInRanges[i] = countInRanges[i] + entry.count;
										  } else if (ranges[i].length == 1 && (entry.duration/getMinutes) >= ranges[i][0]) {
										  	countInRanges[i] = countInRanges[i] + entry.count;
										  }
									  }
						  	 });
						  	 dataArray.push(ranges,countInRanges);
						  	 callback(err, dataArray);
						   }
					   );
		      }
			});
		  
	  },
	  /**
		 * GetVisitStats is a method return ranges of the number of visits and how many users
		 * have this number of visits in range of time {start time , end time}
		 * @method getVisitStats
		 * @param {TimeStamp} startTime  
		 * @param {TimeStamp} endTime 
		 * @param {Function} callback A callback function on the Analytics object
		 */
	  getVisitStats : function(startTime, endTime, callback) {
		  if (typeof startTime === 'function') {
		  	callback = startTime;
			  startTime = 0;
			  endTime = new Date().getTime;
		  }
		  var milliSecondsInADay = 86400000;
	  	var Db = DbClass.getDb();
	  	Db.collection('visits', function(err,collection) {
	  		 if (err) {
		      	Logger.warn('Error while get visits stats ' , err);
		      } else {
						collection.group(
						   {userId : true}
						   ,{stime: {$gte : parseInt(startTime), $lt: parseInt(endTime + milliSecondsInADay)}}
						   ,{ count: 0}
						   ,function(doc, out){ out.count++; }
						   ,function(err, results) {
						  	 var ranges = [ [ 1, 5 ], [ 6, 20 ], [ 21, 50 ], [ 51, 100 ], [ 101 ] ],
						  	 		 countInRanges = [0, 0, 0, 0, 0],
						  	 		 dataArray = [ ];
						  	 results.forEach (function (entry) {
						  		 for (i = 0; i < ranges.length; ++i) {
						  			 	if (ranges[i].length == 2 && entry.count >= ranges[i][0] &&  entry.count <= ranges[i][1]) {
										  	countInRanges[i] = countInRanges[i] + 1;
										  } else if (ranges[i].length == 1 && entry.count >= ranges[i][0]) {
										  	countInRanges[i] = countInRanges[i] + 1;
										  }
									  }
						  	 });
						  	 dataArray.push(ranges,countInRanges);
						  	 callback(err, dataArray);
						   }
					   );
		      }
	  	});
		 
	  },
	  /**
		 * @method getVisits is a method used to get visits log for the user that has Id
		 * @param {String} Id hold user id
		 * @param {Function} callback(error, data) callback function return with 
		 * visits log of the user that has this Id , visits log returned in data object.
		 */
		getVisits : function(Id , callback) {
			var ObjectID = require('mongodb').ObjectID,
					Db = DbClass.getDb(), visits = {}, data = {};
			Db.collection('visits', function(error,collection) {
	      if (error) {
	      	Logger.warn('Error while get Visits for user ', error);
	      } else {
	      	collection.group(
					   {stime: true, uagent: true, etime:true , duration: true}
					   ,{userId: new ObjectID(Id) }
					   ,{}
					   ,function(doc, out){}
					   ,function(error, results) {
					  	 visits = results;
					  	 //goto data base again to get registrationDate
					  	 Db.collection('users', function(error,collection) {
					      if (error) {
					      	Logger.warn('Error while get Visits for user ', error);
					      } else {
					      	collection.group(
								   {registrationDate: true}
								   ,{_id: new ObjectID(Id) }
								   ,{}
								   ,function(doc, out){}
								   ,function(error, results) {
								  	 data.visits = visits;
								  	 data.registrationDate = results[0].registrationDate;
								  	 callback(error, data);
								   }
					      	);
					      }
					  	 });
					   }
	      	);
	      }
			});	
		}
	});

	return Analytics;
});
