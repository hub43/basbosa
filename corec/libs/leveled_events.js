if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['require', './logging_module', './basbosa'], function( require, LoggingModule) {
 	// Can add more complex checks here
	var SERVER = typeof(exports) !== 'undefined';
	var Logger = LoggingModule;
	var levels = {
			'afterLast'			: 3,
			'last'					: 2,
			'normal'				: 1,
			'first'					: 0,	
	};


	function EventObject(message, handlers, context) {
		this.name 			= message.eventName;
		this.result			= {eventName : message.eventName + '_result', message : {}};
		this.message		= message;
		this.handlers		= handlers;
		var count				= 0;
		var self 				= this;
		next();

		function next() {
			Logger.trace("Calling handler number " + count + " for event " +  message.eventName);
			handlers && handlers[count] && handlers[count++].call(context, self, message, next);
		}
	}


	function LeveledEvents() {

	};

	LeveledEvents.prototype.localEventHandler = function(message) {
		Logger.debug('got message ' + message.eventName, message);
		if (typeof message.eventName == 'undefined') {
			Logger.warn('Malformed message' + message);
		}
		if (!this._fHandlers || !this._fHandlers[message.eventName]) {
			Logger.warn('Calling trigger for event ' + message.eventName + ' before listening to it');
			// Add wild handlers to this event then fire it again
			Logger.info('Attaching wild handlers to ' + message.eventName);
			this.lon(message.eventName, function(e, result, next) { next(); });
			this.ltrigger(message.eventName, message);
			
			return;
		}
		new EventObject(message, this._fHandlers[message.eventName], this);
	};


	LeveledEvents.prototype.addWildHandlerToEvent = function(eWild, e) {
		var self = this;
		_.each(this._wildHandlers[eWild], function(wildHandlerLevel, level) {
			self._handlers[e][level] = self._handlers[e][level] || [];
			 _.each(self._wildHandlers[eWild][level], function(wildHandler, handler) {
				// Only add handler if it does not exist
				if (self._handlers[e][level].toString().indexOf(self._wildHandlers[eWild][level][handler]) == -1) {
					self._handlers[e][level].push(self._wildHandlers[eWild][level][handler]);
					self.__buildFlat(e);
				}
			});
		});
	};


	LeveledEvents.prototype.lon = function(event, level, handler) {
		if (typeof level === 'function') {
			handler = level;
			level = levels.normal; 
		} else {
			level = levels[level];
		}
				
		var self = this;
		var wildHandlers = self._wildHandlers || (self._wildHandlers = {});
		var handlers = self._handlers || (self._handlers = {});
		self._fHandlers || (self._fHandlers = {});
		//self._hHandlers || (self._hHandlers = {});
    
		if (event.indexOf('*') > -1) {
      wildHandlers[event] = wildHandlers[event] || [];
			wildHandlers[event][level] = wildHandlers[event][level] || [];
      wildHandlers[event][level].push(handler);
      // Add wild Handler to all existing events
      _.each(handlers, function(eventHandler, existingEvent) {
				//Logger.debug(e);
				// Check if the wild event name matches the event name
				var str = event.replace('*', '');
				if (str == '' || existingEvent.indexOf(str) > -1) {
					self.addWildHandlerToEvent(event, existingEvent);

				}
			});
    } else {
			// Check queue & add *
      handlers[event] = handlers[event] || [];
      handlers[event][level] = handlers[event][level] || [];
      handlers[event][level].push(handler);

      // Add any wild handler already existing to the new added event
    	_.each(wildHandlers, function(wEventHandler, eWild) {
				// Check if the wild event name matches the event name
				var str = eWild.replace('*', '');
				if (str == '' || event.indexOf(str) > -1) {
					self.addWildHandlerToEvent(eWild, event);
				}
			});

			// To prevent listening to the same event more than once
			self.removeListener && self.removeListener(event, this.localEventHandler);
			self.on && self.on(event, this.localEventHandler);
			Logger.debug('Listeneing to ' + event);
			self.__buildFlat(event);
    }
  };

	LeveledEvents.prototype.__buildFlat = function(event) {
		var self = this;
		var handlers = self._handlers;
		// generate the flatten handlers array
		self._fHandlers[event] = [];
		_.each(handlers[event], function(handlersAtLevel, level) {
			_.each(handlers[event][level], function(handlerFunction, handler){
				self._fHandlers[event].push(handlers[event][level][handler]);
			});
		});
	};

	LeveledEvents.prototype.ltrigger = function(eventName, message) {
		message = message || {};
		message.eventName = eventName;
		this.localEventHandler(message);
	};


  return LeveledEvents;

});