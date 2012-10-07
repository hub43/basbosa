if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define([ '../libs/db', 'backbone' ], function(DbClass) {

	var Analytics = Backbone.Model.extend({
	  collectionName : 'users',
	  defaults : {
	    message : '',
	    timestamp : -1
	  },
	  search : function(username, callback) {
	  	var data = {};
	  	var query = username + '*', options = {};
	  	options.success = function (results) {
	  		callback (null, results);
			};
			options.error = function (err) {
				callback (err);
			};
			username == '' ? this.find({username : {$regex : 'l*', $options: 'i' }}, options) : this.find({
				username : {$regex : query, $options: 'i' }}, options);   
	  },
	  getActiveUsers : function(startTime, endTime, cb) {
	  	var milliSecondsInADay = 86400000;
	  	var Db = DbClass.getDb();
	  	Db.collection('visits', function(err,collection) {
	  		 if (err) {
		      	Logger.warn('Error while get active users ', err);
		      } else {
						collection.group(
						   {stime : true}
						   ,{stime: {$gte : parseInt(startTime), $lt: parseInt(endTime + milliSecondsInADay)}}
						   ,{ count: 0}
						   ,function(doc, out){ out.count++; }
						   ,function(err, results) {
						  	 cb(err, results);
						   }
					   );
		      }
	  	});
	  },

	  getSessionLengths : function(startTime, endTime, cb) {
		  if (typeof startTime === 'function') {
			  cb = startTime;
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
						  	 cb(err, dataArray);
						   }
					   );
		      }
			});
		  
	  },
	  getVisitStats : function(startTime, endTime, cb) {
		  if (typeof startTime === 'function') {
			  cb = startTime;
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
						  	 cb(err, dataArray);
						   }
					   );
		      }
	  	});
		 
	  },

	});

	return Analytics;
});
