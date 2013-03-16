var Path = require('path'),
    Fs = require('fs'),
    _ = require('underscore'),
    _str = require('underscore.string'),
    BasbosaConfig,
    config;

_.mixin(_str.exports());

/**
 * The globals class register certain global variables that
 * can be accessed from anywhere on the server side
 * @class Globals
 * @module Cores
 */

var Globals = function() {
  var defaultConfig, appConfig;
	/**
	 * The full path to the parent folder of current application. The application folder
	 * is not included. No trailing slash is included
	 * @property APP_PATH
	 * @type {string}
	 * 
	 */

  GLOBAL.Basbosa          = require('basbosa-registry');
	
  // Load Basbosa config managing class
  // and set the compiled config as the default config
  require('basbosa-config');
	
	// Load BasbosaConfig, start with the default
	// Hack due to bug in cloning arrays in Config.extend

  defaultConfig = require('./default_config');

  
  Basbosa('Config').setConfig(defaultConfig.BasbosaConfig);

	if (Fs.existsSync(Basbosa('Config').get('appPath') + '/apps/config/index.js')) {
    appConfig = require(Basbosa('Config').get('appPath') + '/apps/config/index.js');
    Basbosa('Config').set(appConfig.Config);
	}

	//Parse command lines, put them in the Config
  require('./commander')(Basbosa('Config'));

  // Build dynamic Config values
  defaultConfig.dynamic();
  if (typeof appConfig.dynamic === 'function') appConfig.dynamic();
  

  // Logger
  require('basbosa-logger');

  // Mongo Db
  require('basbosa-mongo')

	// To load all modules in a directory
	var requireDir	= function(path, loadOptions) {
		var options = {
			'ignore'	:	/svn|index/gi,
			'replace'	: /_module|\.js/gi,
		}; 
		var _modules = {};
		_.extend(options, loadOptions);
		require('fs').readdirSync(path).forEach(function(file) {
		  if (file.match('.js') == null) return;
			if (file.match(options.ignore) == null) {
			  	var className = _(file.replace(options.replace, '')).classify();
		  	_modules[className] = require(path + '/' + file);
		  }
		});
		
		return _modules;
	};
	

  
	Basbosa.add('requireDir', requireDir);

};
Globals();	

