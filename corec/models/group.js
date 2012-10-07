if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../collections/sectors'
	,	'../collections/apps'
	,	'../collections/users'
	, './sector'
	, './behaviours/uuid'
	, 'backbone'
	], function(SectorsList, AppsList, UsersList, Sector, Uuid) {
	var GroupModel = Backbone.Model.extend({
		idAttribute	: "_id",
		collectionName : 'groups',
		activeSector  : null,

		initCoreC: function() {
			
			this.sectors 	= new SectorsList();
			this.apps			= new AppsList();
			this.users 		= new UsersList();

			// copy sectors from the array in model's attributes to sectors backbone collection
			var self = this;
			
			_.each(this.get('sectors'), function(sector) {
				sector.group = self;
				self.sectors.add(new Sector(sector));
			});
					
			_.each(this.get('apps'), function(app) {
				self.apps.add(app);
			});
			
			if (!SERVER && j.user.get('sectorId')) {
				// In case the sector the user should join is not in the group
				var sector = this.sectors.get(j.user.get('sectorId'));
				!sector && (self.sectors.add(new Sector({ _id : j.user.get('sectorId')})));
			}
		},
		

		setActiveSector : function(sectorId) {
			this.activeSector = this.sectors.get(sectorId);
		},

		findUserById :	function (userId, cb) {
			var found = null;
			this.sectors.each(function(sector) {
				found || (found = sector.users.get(userId));
			});
			cb(found);
		},
		
		getActivity : function (activityId) {
			if (this.sectors.get(activityId)) {
				return this.sector.get(activityId);
			} else  {
				return this.apps.get(activityId);
			}
				
		},
		
		update : function(args) {
			var obj = this;
			for(var i = 0; i < args.length - 1 ; i++) {
				var arg = args[i];
				// Collections names are always plural, should use here better 
				// techniques to detect plural names
				if (arg.charAt(arg.length - 1) === 's') {
					// select the object in a collection
					obj = obj[arg].get(args[i+1]);
					i++;
				} else {
					// select the object in an object
					obj = obj[arg];
				}
			}
			if (obj && obj.set) {
				obj.set(args[i]);
			} else {
				Logger.warn('obj has no methis set', obj, args);
			}
			
			return obj;
		}
		
  });

	_.extend(GroupModel.prototype, Uuid);
  return GroupModel;

});