if (typeof define !== 'function') {	var define = require('amdefine')(module); }

define([], function() {
	
	/**
	 * SERVER: true if this code is running server-side, false if client-side
	 */
	var SERVER = typeof (exports) != 'undefined', instance, isFirstTime = true;
	
	/**
	 *  
	 *	colors	(boolean,	default true)	- specifies whether to use colors for log levels or not
	 *	enabled	(boolean,	default tue)	- specifies whether the logger is enabled to output messages or not
	 *	showTime	(boolean,	default true)	- specifies whether a time stamp should be output with log messages or not
	 *	showPath	(boolean,	default true)	- specifies whether a path to the file logging the message shoud be output with it
	 *	level	(int,		default 3)		- specifies the highest log level to be output (***indexing is zero-based***)
	 *	poorLogger (boolean, default false) - On browsers without a console object
	 *	uiLogger	(boolean, true) - Enable or disable on screen custom logger, usefull on mobile and tablets requires jquery 
	 * 
	 */
	var defaultOptions = {
			colors 		: SERVER ? true : false,
			enabled 	: true,
			showTime	: true,
			showPath	: true,
			level			: 2,
			poorLogger: false,
			uiLogger  : true
	};
		
	/**
	 * Log levels.
	 */
	var levels = [
		'error'
		, 'warn'
		, 'info'
		, 'debug'
		, 'trace'
	];

	/**
	 * Colors for log levels.
	 */
	var colors = [
		31
		, 33
		, 36
		, 90
		, 90
	];

	/**
	 * Converts an enumerable to an array.
	 *
	 * @api public
	 */ 	 
	var toArray = function (enu) {
	  var arr = [];

	  for (var i = 0, l = enu.length; i < l; i++)
		arr.push(enu[i]);

	  return arr;
	};
	
	/**
	 * Pads the nice output to the longest log level.
	 */
	function pad (str) {
		var max = 0;

		for (var i = 0, l = levels.length; i < l; i++)
			max = Math.max(max, levels[i].length);

		if (str.length < max)
			return str + new Array(max - str.length + 1).join(' ');

		return str;
	};

	/**
	 * Logger class
	 *  optional argument to constructor (if not included, defaults options are applied):
	 * @api public
	 */
	 var Logger = function (opts) {
		 this.setOptions(opts);
	};
	
	/**
	 * setOptions method to update logger options after initialization
	 *
	 */
	Logger.prototype.setOptions = function (opts) {
		// Auto populate logging level
		typeof Config != 'undefined' && Config.logging != 'undefined' &&	(defaultOptions.level = Config.logging);
		if (typeof BasbosaConfig  != 'undefined') {
			if (BasbosaConfig.logging != 'undefined') defaultOptions.level = BasbosaConfig.logging;
			
			// on iphone, no support for multiple arguments to console.log function
			// if (BasbosaConfig.agent.family == 'iPhone') opts.poorLogger = true;
		}
		opts = opts || {}; // make this argument optional
		for (var optKey in defaultOptions) {
			this[optKey] = typeof(opts[optKey]) === 'undefined' ? defaultOptions[optKey] : opts[optKey]; 
		}
		//_.extend(this, defaultOptions, opts);
	};
	
	Logger.prototype.initUiLogger = function() {
		var $buttonMax, $buttonClose;
		if (typeof $ === 'undefined') return;
		
		$('body').append($('<div>').addClass('basbosa-logger')					   
  		.css({
  			'position': 'fixed',
  			'top': '0',
  			'opacity': '0.8',
  			'display': 'block',
  			'width': '100%',
  			'height': '100px',
  			'background-color': 'white',
  			'z-index': '1001',
  			'overflow': 'scroll'
  			})
  	);
    			
		$buttonMax = $('<input>')
			.attr({'class' : 'basbosa-logger-max-min',	type	: 'button',	value	: '+'})
			.css({'right': '45px','position': 'fixed'})
			.click(function() {			
				$('.basbosa-logger').css('height', $('.basbosa-logger').css('height') == '100px' ? '100%' : '100px');
		});
			
		$buttonClose = $('<input>')
			.attr({'claas' : 'basbosa-logger-close',	type	: 'button',	value	: 'x'})
			.css({'right': '15px','position': 'fixed'})
			.click(function() {			
				$('.basbosa-logger').hide();	
		});
		
		$('.basbosa-logger').append($buttonMax, $buttonClose);
		
		isFirstTime = false;
	};
	
	/**
	 * log method.
	 *
	 * @api public
	 */
	Logger.prototype.log = function (type) {
		var index, consoleArgs, filePath = '', lineNumber, traceDetails;
		
		for (var i = 0; i < levels.length; i++) {
			if (levels[i] == type) index = i;
		}
		
		if (index > this.level 
				|| !this.enabled
				|| typeof console == 'undefined' 
				|| typeof console.log == 'undefined')
			return this;
				
		
		// Works only for V8 (i.e. Chrome & nodejs)
		Error.prepareStackTrace = function (error, frames) {
			var frame, i;
			for (i = 0; i < frames.length; ++i) {
				// if this is not the path to logging_module.js, assign this frame to the var 'frame'
				if (frames[i].getFileName().indexOf('logging_module') == -1) {
					frame = frames[i];
					break;
				}
			}
			filePath = frame.getFileName();
			// Exclude app root from logged file path
			if (typeof APP_PATH != 'undefined')  filePath = filePath.replace(APP_PATH, '');
			if (!SERVER) filePath = filePath.replace(window.location.origin, '');
			
			lineNumber = frame.getLineNumber();
			return '';
		};
		
		try {
			throw (new Error());
		}
		
		catch (e) {
			var frames, i;
			// if in V8, this will change filePath and lineNumber to the expected values
			// thanks to Error.prepareStackTrace = ... above
			e.stack;
			// if in V8
			if (!(filePath == '' && lineNumber == -1))
				traceDetails = '[@' + filePath + ':' + lineNumber + ']';
			// else (i.e. Firefox)
			else if (e.stack) {
				frames = e.stack.split('\n');
				for (i = 0; i < frames.length; ++i) {
					// if this is not the path to logging_module.js, assign this frame to the var 'traceDetails'
					if (frames[i].indexOf('logging_module') == -1) {
						traceDetails = frames[i];
						break;
					}
				}
				traceDetails = '[' + traceDetails.substring(traceDetails.indexOf('@')).replace(window.location.protocol + '//' + window.location.host, '') + ']';
			}
		}
	
		
		consoleArgs = this.getMyConsoleArgs(arguments, this, type, traceDetails, index);
		console.log && console.log.apply && console.log.apply(console, consoleArgs);
		return this;
	};
	
	Logger.prototype.getLogTime = function() {
		var date = new Date()
		function checkTime (i) {
			return i < 10 ? '0' + i : i + '';
		}
		
		return checkTime(date.getHours()) + ':'
			+ checkTime(date.getMinutes()) + ':' + checkTime(date.getSeconds());
	};
	
	Logger.prototype.uiLog = function(type, outputConsoleArgs) {
		if (typeof $ === 'undefined') return;
		$loggerRow = $('<div>').addClass('basbosa-logger-' + type).html(outputConsoleArgs + '<hr/>');
		$('.basbosa-logger').append($loggerRow);
		$('.basbosa-logger').scrollTop(99999999999);
							
		/**
		 * style the fonts each type with specific color 
		 */
		$('.basbosa-logger-debug').css({ 'color': '#3333FF'});
		$('.basbosa-logger-trace').css({ 'color': '#333366'});
		$('.basbosa-logger-error').css({ 'color': 'red'});
		$('.basbosa-logger-info').css({ 'color': '#66CC00'});
	};
	
	Logger.prototype.getMyConsoleArgs = function (inputConsoleArgs, context, type, traceDetails, index) {
		var outputConsoleArgs = new Array();
		context.showTime ? outputConsoleArgs.push(context.getLogTime()) : '';
		outputConsoleArgs.push(context.colors ? '\033[' + colors[index] + 'm' + pad(type) + ' -\033[39m' : type + ':');
		//var inputs = toArray(inputConsoleArgs).slice(1);
		
		
		for (var i = 1; i < inputConsoleArgs.length; ++i) {
			if (inputConsoleArgs[i] == '[object Object]') 
				outputConsoleArgs.push(JSON.stringify(inputConsoleArgs[i]));
			else
				outputConsoleArgs.push(inputConsoleArgs[i]);
		}
		
		
		context.showPath ? outputConsoleArgs.push(traceDetails) : '';		
				
		if (context.uiLogger) {					
			if (isFirstTime ) {
				context.initUiLogger();						
			}
			context.uiLog(type, outputConsoleArgs);
		}	
		
		return outputConsoleArgs;
	}

	/**
	 * Generate methods for each log level.
	 */

	for (var i = 0; i < levels.length; i++) {
		var name = levels[i];
		(function(name) {
			Logger.prototype[name] = function () {			
				this.log.apply(this, [name].concat(toArray(arguments)));			
			};
		})(name);
		
	}
	
	
	if (typeof instance === 'undefined') instance = new Logger;
	if (!SERVER) window.Logger = instance;
	if (typeof Basbosa !== 'undefined') Basbosa.add('Logger', instance);
	return instance;
	
});