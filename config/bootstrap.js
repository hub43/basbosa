var	Path 		= require('path');

/**
 * The one and only place to define globals
 **/


GLOBAL.APP_PATH 				= Path.dirname(Path.dirname(__filename));
GLOBAL.PUBLIC_DIR				= 'corec';
GLOBAL.PUBLIC_PATH 			= APP_PATH  + '/' + PUBLIC_DIR;
GLOBAL.SERVER_PATH 			= APP_PATH  + '/cores';

GLOBAL.SERVER 					= true;
GLOBAL.Logger						= require(GLOBAL.PUBLIC_PATH + '/libs/logging_module');
GLOBAL._ 								= require(GLOBAL.PUBLIC_PATH + '/vendors/underscore-1.3.1');
GLOBAL._.str						=	require(GLOBAL.PUBLIC_PATH + '/vendors/underscore.string-2.1.1.js');

_.mixin(_.str.exports());
_.str.include('Underscore.string', 'string'); 

GLOBAL.Backbone 				= require(GLOBAL.PUBLIC_PATH + '/vendors/backbone-0.9.2');

GLOBAL.j								= {};



// Our lovely t() function for translations is replaced with real one
// as soon as the I18n module is ready
GLOBAL.t								= function(x){return 'Warning! dialect is not loaded yet.';};

//Config
GLOBAL.Config = require('./index');
// Reload options to populate from config
Logger.setOptions();

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

