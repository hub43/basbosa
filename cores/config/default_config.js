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

  skipHttpServer : false,

	httpProtocol : 'http',
	serverName : 'localhost',
	port : 3000,
	defaultGroup : '4fb212dd6c379e2810000000',
	
	enableFeedback : true,

	feedbackUrl : 'https://docs.google.com/a/hub43.com/spreadsheet/viewform?pli=1&formkey=dFBqaTRDSGZyR2pfU1k1WGdXUWU3ekE6MQ#gid=0',
	recordClientErros : false,
	app : 'apps',
	
	
	// Testing config
	test : false,
	testUsers : 5,
	skipOpt : false,
	//The configurations that are available to client 
	clientConfig : ['debug', 'min', 'build', 'logging' ,'enableFeedback', 'feedbackUrl'],
	// Populated after client app is minified for each theme
	build : {},
	languages : {
		
	},
	skipSocketAuth : false,
	successLogin : '/',
	db : {
		host : 'localhost',
		port : 27017,
		database : 'basbosa',
		username : '',
		password : ''
	},

	dialect : {
		current_locale : 'a',
		base_locale : '',
		locales : [ ],
		store : {
			mongodb : {
				database : 'hawks',
			}
		}
	},

	enableDialectHttp : false,
	
	dialectHttp : {
		users : [ {
			username : 'admin',
			password : 'jeeadmin'
		} ]
	},
	
	auth : {
		facebook : {
			clientID		: '112420018771592',
			clientSecret: '5b3aa8efcc66e1616c835a2fbfddaef5'
		},
		
		twitter: {
			consumerKey		:	'u8LH73UmwLG46uMYPA8y5A',
			consumerSecret: 'hcNSbu6cwJJSBOFzFDbw1jqGbZ0cG7Z50t1KbnFaLW4'
		},
		dummy	: null
	},
	
	
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
    skipOpt: ['-s, --skip-opt', 'skip client optimization using uglify']
  }

};


var dynamic = function() {




  //Dynamic config values
  var c = Basbosa('Config');
  process.env.NODE_ENV = c.get('env');
  c.set('debug',  c.get('env') == 'development');
  c.set('webRoot',  c.get('httpProtocol') + '://' + c.get('serverName') + ':' + c.get('port'));
  c.set('dialectHttp.port', c.get('port') + 1);
  c.set('dialectHttp.dialect', c.get('dialect'));
  c.get('test') && c.set('skipSocketAuth', true);
  c.set('testServer', 'http://' + c.get('serverName') + ':' + c.get('port'));
  c.set('requireOpt.optimize', c.get('skipOpt') ? 'none' : 'uglify');
  
};

module.exports = {
  BasbosaConfig : BasbosaConfig,
  dynamic : dynamic
};
