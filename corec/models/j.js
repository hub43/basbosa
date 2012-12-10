if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'./user'
	,	'./group'
	,	'../collections/groups'
	, '../libs/leveled_events'
	, 'backbone'	
	, 'basbosa-registry'
	], function(User, Group, GroupsList, LeveledEvents) {
	
	var JModel = Backbone.Model.extend({
		// Used on client only
		populateC : function() {
			/* This function should be removed.
			 it should be reviewed to make sure commenting this block does
				not affect other apps
			*/
			this.user 	= new User(jRaw.user);
			this.group	= new Group(jRaw.group);		
			
		},
		// Used on Server only
		populateS : function() {
			var groups = require('../../config/db/groups');
			GLOBAL.j = this;
			
			// Groups should be loaded in a different way
			this.group = new Group(groups[Config.app]);
		}
			
  });
	var instance = new JModel();
	Basbosa && Basbosa.add('j', instance);
	// if we are on client side 
	if (SERVER) {
		return instance;
	} else {
		_.extend(instance, new LeveledEvents());
		return instance;
	}
	
  
});