if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	 '../models/group'
	, 'backbone'
	], function(GroupModel) {

	var GroupsList = Backbone.Collection.extend({
		model 				: GroupModel
	});


  return GroupsList;

});