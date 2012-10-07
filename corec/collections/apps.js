if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../models/app'
	], function(AppModel) {
	var AppsList = Backbone.Collection.extend({
			model 				: AppModel

  });

  return AppsList;

});