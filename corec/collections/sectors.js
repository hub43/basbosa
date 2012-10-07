if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../models/sector'
	, 'backbone'
	], function(SectorModel) {
	var SectorsList = Backbone.Collection.extend({
			model 				: SectorModel

  });

  return SectorsList;

});