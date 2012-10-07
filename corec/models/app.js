if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../collections/users'
	, '../collections/messages'
	, 'backbone'
	], function(UsersList, MessagesList) {
	var AppModel = Backbone.Model.extend({
		idAttribute	: "_id",
		defaults : {
			type				: 'App',
			name				: null,
			url					: null,
			embedding		: null

		}

  });

  return AppModel;

});