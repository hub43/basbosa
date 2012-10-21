if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['underscore'], function(_) {
	var config, defaults = {
			socketUrl : '/'
	};
	if (typeof BasbosaConfig !== 'undefined') {
		config = BasbosaConfig;
	} else if (typeof jRaw !== 'undefined') {
		config = jRaw;
	} else {
		config = {};
	}
	config = _.extend(defaults, config);
	
	var Config = {
			__config : config,
			read	: function(index) {
				if (typeof this.__config[index] !== 'undefined') {
					return this.__config[index];
				} else {
					Logger.warn('The value ' + index + ' is not defined in Config yet');
					return 'undefined';
				}
			},
			write : function(index) {
				this.__config[index] = value;
				return this;
			}		
	};
	Config.get = Config.read;
	Config.set = Config.write;
	return Config;
});