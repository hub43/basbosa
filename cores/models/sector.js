if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../../corec/models/sector'
  ,	'backbone'
	], function(Sector) {
	
	var SectorServer = {
		collectionName 	: 'sectors',
		
		initCoreS : function() {
			Logger.info('Sector initCoreS');
			this.on('change:usersCount', this.update, this);
		},
		
		getSectorForUser : function(user, cb) {
			cb(Config.testSectorId);
		},
		
		prepareForStats : function() {
			var jsonObj = this.toJSON();
			jsonObj.users = this.users.toJSON();
			return jsonObj;
			
		},
		/**
		 * Searches for any valid user socket and return it
		 * @returns a socket in the current sector
		 */
		getSocket : function() {
			var socket = null;
			this.users.each(function(user) {
				user.sockets && user.sockets[0] && user.sockets[0].emit && (socket = user.sockets[0]); 
			});
			if (!socket) Logger.warn('No socket found in current sector');
			return socket;
		}
	
  };
	
	_.extend(Sector.prototype, SectorServer);
	return Sector;

});