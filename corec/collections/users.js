if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	 '../models/user'
		, 'backbone'
	], function(UserModel) {

	var UserList = Backbone.Collection.extend({
		model 				: UserModel
	});



  return UserList;

});