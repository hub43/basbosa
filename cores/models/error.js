if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['backbone'], function () {

	var errorsCount = {};
	var Error = Backbone.Model.extend({
			collectionName : 'errors',
			defaults : {
				timestamp : (new Date).getTime()
			},
			
			createError : function(req) {	
				// There is an error on the client
				errorsCount[req.headers.cookie] = errorsCount[req.headers.cookie] || 1; 
				var err = {
					userId		: req && req.user && req.user._id,
					error 		: req.body,
					headers		: req.headers,
					errorCount: errorsCount[req.headers.cookie]++
				};
				
				this.set(err);
				this.create();
				return errorsCount[req.headers.cookie];
			}
	});
	
	return Error;
});
