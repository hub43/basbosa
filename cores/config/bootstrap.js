var Path = require('path'),
    Fs = require('fs'),
    BasbosaConfig,
    config;


/**
 * The globals class register certain global vairables that
 * can be accessed from anywhere on the server side
 * @class Globals
 * @module Cores
 */

var Globals = function() {
	
	/**
	 * The full path to the parent folder of current application. The application folder
	 * is not included. No trailing slash is included
	 * @property APP_PATH
	 * @type {string}
	 * 
	 */
	var pdn = Path.dirname;
	GLOBAL.APP_PATH 				= pdn(pdn(pdn(pdn(pdn(__filename)))));

	GLOBAL.PUBLIC_DIR				= 'appc';
	GLOBAL.PUBLIC_PATH 			= APP_PATH  + '/' + PUBLIC_DIR;
	GLOBAL.SERVER_PATH 			= APP_PATH  + '/apps';
	GLOBAL.CORES						= APP_PATH + '/node_modules/basbosa/cores';

	GLOBAL.SERVER 					= true;
	GLOBAL._ 								= require('../../corec/vendors/underscore-1.3.1');
	_.str						        =	require('../../corec/vendors/underscore.string-2.1.1.js');
	GLOBAL._.inflection            = require('../../corec/vendors/underscore.inflection-1.0.0.js');
	
	// Load Basbosa class registry
	GLOBAL.Basbosa          = require('basbosa-registry');
	
	
	// Load BasbosaConfig, start with the default
	BasbosaConfig = require('./default_config');
  config = new BasbosaConfig(); 
	
	
	// Override with the index config file
	if (Fs.existsSync(SERVER_PATH + '/config/index.js')) {
	  config = _.extend(config, require(SERVER_PATH + '/config/index.js'));
	}
	
	// Override with local config file
	if (Fs.existsSync(SERVER_PATH + '/config/local.js')) {
	  config = _.extend(config, require(SERVER_PATH + '/config/local.js'));
  }
	
// Parse command lines, put them in the Config
  require('./commander')(config);
	
	// Build dynamic Config values
  config.dynamic();
    
  // Load Basbosa config managin class
  // and set the compiled config as the default config
  require('basbosa-config');
  Basbosa('Config').setConfig(config);
  
  // Logger
  require('basbosa-logger');

  
	_.mixin(_.str.exports());
	_.str.include('Underscore.string', 'string'); 
	

	GLOBAL.Backbone 				= require('../../corec/vendors/backbone-0.9.2');
	
	/*
	 * Extend Backbone with functionality on the client 
	 */ 
	require('../../corec/libs/app_backbone');
	

	/*
	 * Extend Backbone at server side for mongo db operation
	 */ 
	require('../libs/mongodb_backbone');
	
	GLOBAL.j								= {};

	/**
	 * The t function is present client side and server side to handle all translations
	 * based on the logged in user local. If no user is logged in, the t function 
	 * will use the default application local. If the translation for a certain text is
	 * not avaidlble for a certain local, an entry in the translations collection 
	 * will be automaitclly created that can be translated using http interface
	 * @method t
	 */
	GLOBAL.t								= function (x) {return 'Warning! dialect is not loaded yet.';};

	
	

	// Config
	// GLOBAL.Config = require('./index');
	// Reload options to populate from config
	// Basbosa('Logger').setOptions();

	// To load all modules in a directory
	GLOBAL.AppDirLoad	= function(path, loadOptions) {
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
	

  /*
   * Load default core models
   */
  require('../models');
	
	/*
   * Load application models if they exist 
   */

  if (require('fs').existsSync(APP_PATH + '/appc/models')) {
    AppDirLoad(APP_PATH + '/appc/models');
  }
  
  
	Basbosa.add('requireDir', AppDirLoad);
};
Globals();	

