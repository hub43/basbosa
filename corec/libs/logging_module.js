if (typeof define !== 'function') {	var define = require('amdefine')(module); }
define(['underscore', 'require', './basbosa'], function( _ , require) {
	
	/**
	 * SERVER: true if this code is running server-side, false if client-side
	 */
	var SERVER = typeof (exports) != 'undefined', instance;
	
	
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
	 *
	 * @api public
	 */
	
	// optional argument to constructor (if not included, defaults options are applied):
	// opts {
		// colors	(boolean,	default true)	- specifies whether to use colors for log levels or not
		// enabled	(boolean,	default tue)	- specifies whether the logger is enabled to output messages or not
		// showTime	(boolean,	default true)	- specifies whether a time stamp should be output with log messages or not
		// showPath	(boolean,	default true)	- specifies whether a path to the file logging the message shoud be output with it
		// level	(int,		default 3)		- specifies the highest log level to be output (***indexing is zero-based***)
	// }
	
	var Logger = function (opts) {
		this.setOptions(opts);
	};
	
	/**
	 * setOptions method
	 *
	 */
	
	// optional argument(if not included, defaults options are applied):
	// opts {
		// colors	(boolean,	default true)	- specifies whether to use colors for log levels or not
		// enabled	(boolean,	default tue)	- specifies whether the logger is enabled to output messages or not
		// showTime	(boolean,	default true)	- specifies whether a time stamp should be output with log messages or not
		// showPath	(boolean,	default true)	- specifies whether a path to the file logging the message shoud be output with it
		// level	(int,		default 3)		- specifies the highest log level to be output (***indexing is zero-based***)
	// }
	
	var defaultOptions = {
		colors 		: SERVER ? true : false,
		enabled 	: true,
		showTime	: true,
		showPath	: true,
		level			: 2,
		poorLogger: false,
		uiLogger  : false
	};
	
	Logger.prototype.setOptions = function (opts) {
		// Auto populate logging level
		typeof Config != 'undefined' && Config.logging != 'undefined' &&	(defaultOptions.level = Config.logging);
	
		opts = opts || {}; // make this argument optional
		// Client side settings
		if (typeof jRaw != 'undefined') {
			jRaw.logging != 'undefined' &&	(defaultOptions.level = jRaw.logging);
			// on iphone, no support for multiple arguments to consol fnctions
			if (jRaw.agent.family == 'iPhone') {
				opts.poorLogger = true;
			}
		}

		_.extend(this, defaultOptions, opts);
	};
	
	/**
	 * log method.
	 *
	 * @api public
	 */
	var isFirstTime = null;
	Logger.prototype.log = function (type) {
		var index = _(levels).indexOf(type), self = this;

		if (index > this.level 
				|| !this.enabled
				|| typeof console == 'undefined' 
				|| typeof console.log == 'undefined')
			return this;
		
		// Logger that do not support multiple parameters
		if (this.poorLogger) {
			for (var i = 1; i < arguments.length ; i++) {								
				console.log.call(console, JSON.stringify(arguments[i]));
			
			}
			
			return ;
		}				
		var date = new Date();
		
		function checkTime (i) {
			return i < 10 ? '0' + i : i + '';
		}
		
		var timeStamp = checkTime(date.getHours()) + ':'
			+ checkTime(date.getMinutes()) + ':' + checkTime(date.getSeconds());
			
		var filePath = '';
		var lineNumber = -1;
		var traceDetails = '';
		
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
			(typeof APP_PATH != 'undefined') ? filePath = filePath.replace(APP_PATH, '')
				: (!SERVER) ? filePath = filePath.replace(window.location.origin, '') : '';
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
	
		function getMyConsoleArgs (inputConsoleArgs, context) {
			var outputConsoleArgs = new Array();
			context.showTime ? outputConsoleArgs.push(timeStamp) : '';
			outputConsoleArgs.push(context.colors ? '\033[' + colors[index] + 'm' + pad(type) + ' -\033[39m' : type + ':');
			//var inputs = toArray(inputConsoleArgs).slice(1);
			for (var i = 1; i < inputConsoleArgs.length; ++i) {
				if(inputConsoleArgs[i]=='[object Object]') 
					outputConsoleArgs.push(JSON.stringify(inputConsoleArgs[i]));
				else
					outputConsoleArgs.push(inputConsoleArgs[i]);
			
			}
			context.showPath ? outputConsoleArgs.push(traceDetails) : '';		
			
			if (!SERVER && self.uiLogger) {
				require(['jquery'], function() {					
					if (isFirstTime == null) {
						$('body').append($('<div>').addClass('logger-div')					   
		    			.css({'position': 'fixed', 'top': '0', 'opacity': '0.8', 'display': 'block'
		    			, 'width': '100%', 'height': '100px', 'background-color': 'white', 'z-index': '1001','overflow': 'scroll'}));
			    			
						//$('.logger-div').append($('<input id = "max-min" value = '+'  type = "button" '/>  <input id = "close" value = "x" type = "button"/>'));
						var buttonMax = $('<input>').attr({id : 'max-min',	type	: 'button',	value	: '+'}),
						buttonClose = $('<input>').attr({id : 'close',	type	: 'button',	value	: 'x'});
							
						$('.logger-div').append(buttonMax, buttonClose);
						
						$('#close').css({'right': '15px','position': 'fixed'});
						$('#max-min').css({'right': '45px','position': 'fixed'});						
						
						/**
						 * add functionality to the buttons 
						 */
						$('#close').click(function() {			
								$('.logger-div').slideToggle('slow');	
						});						
						$('#max-min').click(function() {			
							if ($('.logger-div').css('height') == '100px') {
								$('.logger-div').animate({'height': '100%'}, 1000);	
							} else {	
								$('.logger-div').animate({'height': '100px'}, 1000);
							}
						});						
						/**
						 * 		append new log 
						 */						
						$('.logger-div').append($('<div>').addClass(type).html(outputConsoleArgs+'<hr/>'));
						isFirstTime = 1;
					}	else {										
						$loggerRow = $('<div>').addClass(type).html(outputConsoleArgs+'<hr/>');
						$('.logger-div').append($loggerRow);																									
					}
					/**
					 * show the div at the case it was hiden 
					*/
					if ($('.logger-div').hide()) $('.logger-div').show();
					
					/**
					 * style the fonts each type with specific color 
					 */
					$('.debug').css({ 'color': '#3333FF'});
					$('.trace').css({ 'color': '#333366'});
					$('.erroe').css({ 'color': 'red'});
					$('.info').css({ 'color': '#66CC00'});
			});
		}	
			
			return outputConsoleArgs;
		}
		
		console.log && console.log.apply && console.log.apply (console, getMyConsoleArgs(arguments, this));
		return this;
	};

	/**
	 * Generate methods for each log level.
	 */

	_.forEach(levels, function (name) {				
		Logger.prototype[name] = function () {			
			this.log.apply(this, [name].concat(toArray(arguments)));			
		};
		
	});
	
	instance = new Logger;
	if (!SERVER) window.Logger = new Logger;
	Basbosa && Basbosa.add('Logger', instance);
	return instance;
	
});
