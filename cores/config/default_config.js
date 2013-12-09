/**
 * The default configurations for a Basbosa application on the server side
 * check Config class for information on how to access these configurations
 * 
 * @class BasbosaConfig
 * @constructor
 * @module BasbosaCoreServer
 */

var pdn = require('path').dirname;

var BasbosaConfig = {
  
	/**
	 * The environment the the application runs in. the default value is read from
	 * process.env.NODE_ENV. In case process.env.NODE_ENV is not set will default to 
	 * 'development'
	 * 
	 * @type {String}
	 * @default process.env.NODE_ENV || 'development'
	 * @property env 
	 */
  appPath : pdn(pdn(pdn(pdn(pdn(__filename))))),

  env : process.env.NODE_ENV || 'development',
	min : false,

  skipHttpServer : true,
  sessionsEnabled : true,
  sessionsSecret : 'dFBqaTRDSGZyR2pfU1k1RDSG',

  passport : {
    enabled : false,
    successRedirect : '/',
    failureRedirect : '/login',
    serializeUser : undefined,
    deserializeUser : undefined,
    loginUser : null,
    auth : {

    }
  },
  primus : {
    enabled : false
  },

	httpProtocol : 'http',
	serverName : 'localhost',
	port : 3000,

	recordClientErros : false,
	app : 'apps',
	

	testUsers : 5,
	skipOpt : false,
	//The configurations that are available to client 
	clientConfig : ['debug', 'min', 'build', 'logging' ,'enableFeedback', 'feedbackUrl', 'webRoot'],
	// Populated after client app is minified for each theme
	skipSocketAuth : false,
	successLogin : '/',
	db : {
		host : 'localhost',
		port : 27017,
		database : false,
		username : '',
		password : ''
	},

	enableSessions : true,
  sessionDbConfig : 'default',

	enableDialectHttp : false,
	

	
	requireOpt : {
		baseUrl : (typeof APP_PATH !== 'undefined') ? APP_PATH : 'undefined',
	
		include : [
		  'appc/themes/default/ui',
		  'node_modules/basbosa/corec/app.js'
		],
		name : './appc/app',
		out : (typeof APP_PATH !== 'undefined') ? APP_PATH + '/build/app-opt' : 'undefined',
		digest : '',
		optimize : 'uglify',
		
		// Gets populated after build
		currentApp					: 'none',
		currentTheme 				: 'none'
	},

  basbosaLogger : {
    showTime : false,
    showPath : true,
    level : 3
  },

  commander : {
    port : ['-p, --port <n>', 'main app port number', parseInt],
    env : ['-e, --env <environment>', 'force run environment'],
    test : ['-t, --test', 'run tests on server startup'],
    min : ['-m, --min', 'use minified client'],
    app : ['-a, --app <app>', 'set default app to load'],
    'basbosaLogger.level' : ['-l, --level <level>', 'set logging level'],
    skipOpt: ['-s, --skip-opt', 'skip client optimization using uglify'],
    skipHttpServer: ['-h, --skip-http-server', 'skip auto start http server']
  }

};

//
//var dynamic = function() {
//
//
//
//
//  //Dynamic config values
//  var c = Basbosa('Config');
//  process.env.NODE_ENV = c.get('env');
//  c.set('debug',  c.get('env').indexOf('development') > 1);
//  c.set('webRoot',  c.get('httpProtocol') + '://' + c.get('serverName') + ':' + c.get('port'));
//  c.set('dialectHttp.port', c.get('port') + 1);
//  c.set('dialectHttp.dialect', c.get('dialect'));
//  c.get('test') && c.set('skipSocketAuth', true);
//  c.set('testServer', 'http://' + c.get('serverName') + ':' + c.get('port'));
//  c.set('requireOpt.optimize', c.get('skipOpt') ? 'none' : 'uglify');
//
//};

module.exports = {
  BasbosaConfig : BasbosaConfig,
//  dynamic : dynamic
};
