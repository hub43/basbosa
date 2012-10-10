/**
 * Sector Model provide the core of handling all operation that related 
 * to the sector {find to the user sector to join to it , find socket } 
 * @module Cores
 * @submodule CoresModels
 * @class Sector
 * @property collectionName hold the name of the collection.
 **/
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../../corec/models/sector'
  ,	'backbone'
	], function(Sector) {
	
	var SectorServer = {															//Sector Model inherent from Sector in corec
		collectionName 	: 'sectors',										//define the collection that this class will deal with it.
		/**
		 * initCoreS is a method called directly when defined an instance from sector model
		 * @method initCoreS
		 */
		initCoreS : function() {
			this.on('change:usersCount', this.update, this);
		},
		/**
		 * GetSectorForUser is a method used to return sector ID.
		 * @method getSectorForUser
		 * @param {Object} user hold user object.
		 * @param {Function} callback(sector ID) A callback function on the sector object
		 * return with the available sector id.
		 */
		getSectorForUser : function(user, callback) {
			callback(Config.testSectorId);
		},
		/**
		 * PrepareForStats is a method used to convert users object to json object.
		 * @method prepareForStats
		 * @returns a json Object.
		 */
		prepareForStats : function() {
			var jsonObj = this.toJSON();
			jsonObj.users = this.users.toJSON();
			return jsonObj;
		},
		/**
		 * GetSocket Searches for any valid user socket and return it.
		 * @method getSocket
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