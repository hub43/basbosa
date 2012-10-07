if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../collections/activities'
	, './behaviours/uuid'
	, 'backbone'
	, '../libs/basbosa'
	], function(ActivitiesList, Uuid) {
	var UserModel = Backbone.Model.extend({
		idAttribute 		: '_id',
		collectionName	: 'users',
		defaults : {
			// Settings
			enableSound : true,
			enableMusic : true,
			enableChat	: true,
			points	: 0,
			level		: 1,
			isFirstTime : true,
		},
		
		activities	: new ActivitiesList(),
		sockets			: new Array(),

		initCoreC :  function() {
			this.activities	= new ActivitiesList();
			this.sockets		= new Array();
		},
		
		addActivity:	function(activity) {
			// Make sure this activity doesn't exist
			if (this.activities.where({ name : activity.get('name')}).length) {
				return false;
			}
			return this.activities.add(activity);
		},
		
		pointsInc : function(sectorId, val) {
			val = val || 1;
			this._lastSectorId = sectorId;
			this.set('points', this.get('points') + val);
			if (this.updateGamePoints) {
				this.updateGamePoints(val);
			}
		}
		

  });
	
	_.extend(UserModel.prototype, Uuid);
	Basbosa && Basbosa.add('User', UserModel);
  return UserModel;
});