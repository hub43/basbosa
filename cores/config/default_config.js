module.exports = {
	// Read from environment variable NODE_ENV
	env : process.env.NODE_ENV || 'development',
	min : false,
	logging : 4,
	skipSocketAuth : false,
	port : 3000,
	defaultGroup : '4fb212dd6c379e2810000000',
	
	enableFeedback : true,
	feedbackUrl : 'https://docs.google.com/a/hub43.com/spreadsheet/viewform?pli=1&formkey=dFBqaTRDSGZyR2pfU1k1WGdXUWU3ekE6MQ#gid=0',
	recordClientErros : false,
	app : 'apps',
	serverName : 'localhost',
	
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
		baseUrl : APP_PATH,
	
		include : [
		  'appc/themes/default/ui',
		  'node_modules/basbosa/corec/app.js'
		],
		name : './appc/app',
		out : PUBLIC_PATH + '/build/app-opt',
		digest : '',
		optimize : 'uglify',
		
		// Gets populated after build
		currentApp					: 'none',
		currentTheme 				: 'none'
	},
	
	dynamic : function() {
	  //Dynamic config values
	  process.env.NODE_ENV = this.env;
	  this.debug = this.env == 'development';
	  this.webRoot = 'http://' + this.serverName + ':' + this.port;
	  this.dialectHttp.port = this.port + 1;
	  this.dialectHttp.dialect = this.dialect;
	  this.test && (this.skipSocketAuth = true);
	  this.testServer = 'http://' + this.serverName + ':' + this.port;
	  this.requireOpt.optimize = this.skipOpt ? 'none' : 'uglify';
	}
};