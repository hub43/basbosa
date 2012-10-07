if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
	'./sector'
	, 'backbone'
	], function(SectorModel) {
	var PrivateChatModel = SectorModel.extend({
		defaults		: {
			type			: 'PrivateChat',
			name			:	'Other user\'s name'
		},

  });
  return PrivateChatModel;
});