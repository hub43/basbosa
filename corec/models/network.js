if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    'backbone'
	], function() {
	var NetworkModel = Backbone.Model.extend({
		
		defaults		: {
			options : {
				pingInterval	: 20000,
				monitorInterval : 2000,
				idleTimeOut			: 10000,
				idleServerDown	: 15000,
				autoStart			: true
			},
			countSent				: 0,
			lastPing				: 0,
			lastPingTime		: 0,
			averagePing			: 0,
			totalWait				: 0,
			serverTime			: 0,
			offsetTime			: 0,
			lastMessageTime : 0,
			serverDown			: 0
		},
		
		initialize : function() {
      this.bind('change:serverDown', this.serverDownChange);
		},
		
		serverDownChange : function() {
			(this.previous('serverDown') === 0) && (Logger.debug('Server down'));
		},
		
		genPing : function() {
			var now = (new Date()).getTime();
			this.set('lastPingTime', now, {silent: true});
			this.set('countSent', this.get('countSent') + 1);
			return {
				localTime	: now,
				countSent	: this.get('countSent')
			};
			
		},
		
		monitor : function() {
			var now = (new Date).getTime();
			if (this.get('lastMessageTime') == 0) {
				this.set('lastMessageTime', now);
			} 
			if(now - this.get('lastMessageTime') > this.get('options').idleServerDown) {
				this.set('serverDown', 1);
				//this.trigger('serverDown');
			} else if(now - this.get('lastMessageTime') > this.get('options').idleTimeOut) {
				this.trigger('requestPing');
			}
		},
		
		processPing : function(message) {
			var now = (new Date()).getTime();
			var diff = now - message.localTime;
			this.set('lastPing', diff, {silent: true});
			this.set('totalWait', this.get('totalWait') + diff, {silent: true});
			this.set('averagePing', this.get('totalWait') / this.get('countSent'), {silent: true});
			this.set('serverTime', message.serverTime - (this.get('lastPing') / 2), {silent: true});
			this.set('offsetTime', this.get('serverTime') - this.get('lastPingTime'));
		}
  });
	
  return NetworkModel;
});