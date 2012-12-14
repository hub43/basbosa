if(typeof define !== 'function') { var define = require('amdefine')(module); }
define(['underscore'], function(_) {
	var SERVER = typeof(exports) != 'undefined';
	var instance = null;
	//var Logger = LoggingModule;

	var urlPattern = new RegExp("((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?", "i");

	var _static = {
		getInstance: function() {
			return instance ? instance : (instance = init());

			if(!instance){
				instance = init();
			}
			return instance;
		}
	};
	var _public = {};
	_public = {
		isObjectId: function(msg, field) {
			// Checks if field is an object id
			// (i.e. a 12 byte hex number, taking into consideration that it's represented in a string)
			// Check if field is a string (includes checking if it's present)
			if (!_public.isString(msg, field)) return false;
			// Check if length is 24 characters (i.e. 12 bytes)
			if (msg[field].length != 24) return false;
			
			// checking that each character represents a hex numbers using a regular expression
			return  /[\da-f]{24}/.test(msg[field]);	
		},
		
		isSideId: function(msg, field) {
			// Checks it field is a valid side id
			
			// Check if field is a string (includes checking if it's present)
			if (!_public.isString(msg, field))	return false;
			// Check if length is 11 characters
			if (msg[field].length != 11) return false;
			// Check if it follows the format 'side0-1-1-1' using a regular expression
			var patt = /side[0-5]-[0-7]-[0-5]-[0-7]/;
			return patt.test(msg[field]);
		},
		
		isPresent: function(msg, field) {
			// Checks if field exists in a msg or not
			return _.has(msg, field);
		},

		isString: function(msg, field) {
			// Checks if field inside msg is a string or not
			return _public.isPresent(msg, field) && _.isString(msg[field]);
		},

		isInteger: function(msg, field) {
			// Checks if field inside msg is an integer or not
			return _public.isPresent(msg, field) && _.isNumber(msg[field]);
		},

		isURL: function(msg, field) {
			// Checks if field inside msg is a url or not
			return _public.isPresent(msg, field) && urlPattern.test(msg[field]);
		},
		/**
		 * @method isLargerThan used to check if the length of any string  is larger than specific number.
		 * @param {String} msg hold the message  that contain specific string that need t check on it.
		 * @param {String} field hold the string that need to check on it.
		 * @param {Number} min hold the number that need to limit the length of the string by it.
		 */
		isLargerThan: function(msg, field, min) {
			// Checks if field inside msg is larger than the min value
			if(min === undefined) {
				min = field ;
				field = msg;
				msg = undefined;
			}
			if(msg ===undefined) {
				return (field.length >= min);
			} else {
				return _public.isPresent(msg, field) && (msg[field].length >= min);
			}
			
		},
		/**
		 * @method isValidMail used to check if the value valid to be email or not
		 * @param {String} value hold the value  that need to check on it.
		 */
		isValidMail: function(value) {
			return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value)
		},
		isSmallerThan: function(msg, field, max) {
			// Checks if field inside msg is smaller than the max value
			return _public.isPresent(msg, field) && (msg[field].length <= max);
		},

		isWithin: function(msg, field, min, max) {
			// Checks if field inside msg is within the min and max values
			return _public.isSmallerThan(msg, field, max) && _public.isLargerThan(msg, field, min);
		},
		
		validateWith: function(validator, msg) {
			// Does the actual validation
			if(_.isEmpty(validator)){
				// We either drop or pass a message with an empty validator here, except what happens
				// for authn.socket? There is nothing being passed in it
				// return true; was originally like this
				
				
				return false; // now any message with empty validator will simply be dropped

			}	else { // Validate

				var validation_results = new Array();
				_.each(validator, function(fields) {
					_.each(fields, function(validators, key){
						_.each(validators, function(obj){
							// obj could be a function or an array that contains a function + extra paramters to be given
							// while invoking that function later on in the validation process
							// so first we check if it's an array
							if(_.isArray(obj)) {
								// handle this
								var func = _.first(obj);
								var args = _.union( [msg, key], _.rest(obj, 1) ); // We are ignoring the first item in obj array
								// since this is the validation function name that'll be called below

								if( func.length < _.size( args ) ) { // Arguments passed in validator must not be more
									// than expected function arguments
									return false;
								} else if( func.length > _.size( args ) ) { // or less
									return false;
								} else { // If we reach this final else, then they are equal
									validation_results.push( func.apply(null, args ) );
								}
							} else {
								// must have been a function
								validation_results.push(obj(msg, key));
							}
						});

					});

				});

				if (_.all(validation_results, _.identity)) {
					return true;
				} else {
					Basbosa('Logger').info(validation_results);
					return false;
				}
			}
		}
	};

	function init() {
		return _public;
	}

	if(SERVER) {
		module.exports = _static;
	}
	Basbosa && Basbosa.add('Validations', _static);
	return _static;

});