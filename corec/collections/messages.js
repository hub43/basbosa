if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
		'../models/message'
	, 'backbone'
	], function(Message) {
	var MessagesList = Backbone.Collection.extend({
			model 				: Message

  });

  return MessagesList;

});