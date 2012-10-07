if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['path', 'underscore'], function(Path, _) {
	/**
	 * The globals class register certain global vairables that
	 * can be accessed from anywhere on the server side
	 * @class Globals
	 * @contructor
	 * @modul Cores
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

		GLOBAL.SERVER 					= true;
		GLOBAL.Basbosa					= require('../../corec/libs/basbosa');
		GLOBAL._ 								= require('../../corec/vendors/underscore-1.3.1');
		_.str						=	require('../../corec/vendors/underscore.string-2.1.1.js');
		
		GLOBAL.Config 					= require(SERVER_PATH + '/config');
		_.mixin(_.str.exports());
		_.str.include('Underscore.string', 'string'); 

		GLOBAL.Backbone 				= require('../../corec/vendors/backbone-0.9.2');
		

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

		// Parse command lines
		require('./commander');
		
		// Populate dynamic Config values
		Config.dynamic();
		GLOBAL.Logger						= require('../../corec/libs/logging_module');

		//Config
		//GLOBAL.Config = require('./index');
		// Reload options to populate from config
		//Logger.setOptions();

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
	};
	Globals();	
});
