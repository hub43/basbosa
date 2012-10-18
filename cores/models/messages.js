if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define([ '../libs/db', 'backbone' ], function(DbClass) {
	//define Messages Model
	var Messages = Backbone.Model.extend({
	  collectionName : 'messages',	
	});

	return Messages;
});