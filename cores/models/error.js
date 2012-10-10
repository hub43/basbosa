/**
 * Error Model dealing with errors , set the errors to the data base to help after that to fix it.
 * @module Cores
 * @submodule CoresModels
 * @class Error
 * @property collectionName hold the name of the collection.
 * @property timestamp hold the time stamp of now , used to attach it
 * with the error to indicate when it happened
 **/
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['backbone'], function () {

	var errorsCount = {};
	var Error = Backbone.Model.extend({
		collectionName : 'errors',						//define the collection that this class will deal with it.
		defaults : {
			timestamp : (new Date).getTime()
		},
		/**
		 * createError is a method responsible on create error record contain 
		 * { user id , the error that cased , headers of the request , error count } 
		 * and set it in data base , used to help after that to fix the error.
		 * @method createError
		 * @param {String} req hold the request from the client
		 */
		createError : function(req) {	
			// There is an error on the client
			errorsCount[req.headers.cookie] = errorsCount[req.headers.cookie] || 1; 
			var error = {
				userId		: req && req.user && req.user._id,
				error 		: req.body,
				headers		: req.headers,
				errorCount: errorsCount[req.headers.cookie]++
			};
			this.set(error);
			this.create();
			return errorsCount[req.headers.cookie];
		}
	});
	
	return Error;
});
