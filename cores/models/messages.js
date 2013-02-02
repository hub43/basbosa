if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(['backbone' ], function() {
	//define Messages Model
	var Messages = Backbone.Model.extend({
	  collectionName : 'messages',	
	});

	return Messages;
});