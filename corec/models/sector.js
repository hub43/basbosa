if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../collections/users'
	, '../collections/messages'
	, 'backbone'
	, '../libs/basbosa'
	], function(UsersList, MessagesList) {
	var SectorModel = Backbone.Model.extend({
		idAttribute	: "_id",
		defaults		: {
			type			: 'Sector',
			name			:	'Sector Name'
		},
		// Each sector has its own collection of messages and users
		users 			: null,
		messages		: null,
		
		initCoreC : function() {
			Logger.info('init corec');
			this.users 		= new UsersList();
			this.messages = new MessagesList();
			this.users.on('add', this.updateUsersCount, this);
			this.users.on('remove', this.updateUsersCount, this);
		},
		
		updateUsersCount : function() {
			this.set('usersCount', this.users.length);
		}
		
  });

	Basbosa && Basbosa.add('Sector', SectorModel);
  return SectorModel;
});