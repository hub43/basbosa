if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function(){
	Uuid = {
		/*
		 * SHOULD NEVER BE USED IN A LOOP!
		 */
		getUuid : function () {
			// 5 bytes from least significant usec unix timestamp 
			// 4 bytes from unix timestamp the id is created on server
			// 3 bytes ever incrementing from server 
			var id = this.id, time = (new Date).getTime();
			if (typeof this.__lastTime !== 'undefined' && time == this.__lastTime) {
				time++;
			}
			var uUid = time.toString(16).substring(1, 11) +
			id.substring(0, 7) +
			id.substring(18, 24);
			this.__lastTime = time;
			return uUid;					
			}
	};
	return Uuid;
});