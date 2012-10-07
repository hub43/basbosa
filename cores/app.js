// Bootstrap the app, GLoablas, load Config and parse command lines
require('./config/bootstrap');
// Extend backbone - client and server
require('../corec/libs/app_backbone');
// Extend backbone at server side with mongodb function
require('./libs/mongodb_backbone');
require('./models');
AppDirLoad(APP_PATH + '/appc/models');
/* Loading express and Creating the main server instance */
var App =  require('express')();
App.server = require('http').createServer(App);

Basbosa.add('App', App);

/**
 * Core Server Application
 * The core Server Application receives an instance of the created express application
 * and start attaching request handlers and configure the express application 
 * @module Cores
 * @class CoresApp
 */
initServer = function(App) {
	var	Express 		= require('express')
	, Passport 			= require('./controllers/components/passport').passport
	, Store					=	require('./libs').Store
	, JadeCompiler	= require('./libs/').JadeCompiler
	, Http 					= AppDirLoad(__dirname + '/controllers')
	, SocketServer 	= require('./sockets/components/socket_server')
	, Db						= require('./libs/db')
	, Path					= require('path');
	
	
	// Init Socket	
	SocketServer.init(App);
	
	// Load Sockets controllers
	AppDirLoad(__dirname + '/sockets');
	
	App.configure(function() {
		App.set('views', APP_PATH); // tell express where our templates live
		App.set('view engine', 'jade'); // we are using jade for as template engine
		App.set('view options', {	layout : false }); // disable layouts by default
		App.use(Express.bodyParser()); // prepare body parser middleware for http form posts parsing/ url params handling
		App.use(Express.methodOverride()); // prepare http method override to support unsupported http methods ex: delete, put
		App.use(Express.cookieParser()); // for parsing session cookies
		App.use(Express.session({
			secret : "SOmeSecretHere",
			store : Store.sessionStore,
			key : 'express.sid',
			cookie : {httpOnly : false}
		})); // should generate random key
		App.use(Passport.initialize()); // initialize passport
		App.use(Passport.session()); // setup its session handling
		App.use(JadeCompiler);
		
		App.use(App.router); // push our routing table to the stack
		
		// Blocking access to application files should be done here
		
		// On development, prevent caching to easy change files
		if (Config.env == 'development') {
			App.use(function (req, res, next) {
		    res.setHeader('Pragma-directive', 'no-cache');
		    res.setHeader('Cache-directive', 'no-cache');
		    res.setHeader('Cache-contro', 'no-cache');
		    res.setHeader('Pragma', 'no-cache');
		    res.setHeader('Expires', '0');
		    next();
			});
		}
		App.use(Express.compress({filter : function(req, res) {
			return /json|text|javascript|xml/.test(res.getHeader('Content-Type'));
		}}));
		
		App.use(Express.static(APP_PATH)); // can't find a matching route, tell express where our statics live
		App.use(Express.static(Path.dirname(Path.dirname(__filename)))); // can't find a matching route, tell express where our statics live
	});	
	// development environment will throw errors
	App.configure('development', function() {
		App.use(Express.errorHandler({
			dumpExceptions : true,
			showStack : true
		}));
	});

	// production environment handlers error / should replace with our own error handling ex: 500, 404, 400, 401
	App.configure('production', function() {
		App.use(Express.errorHandler());
	});

	App.get('/*', Http.AppController.beforeAction);
	App.post('/*', Http.AppController.beforeAction);
	App.get('/addText/:locale/:text', Http.AppController.addText);
	App.post('/', Http.ErrorsController.index);
	App.get('/changeBrowser', Http.ErrorsController.changeBrowser);
	App.get('/', Http.GroupsController.index);
	App.post('/', Http.GroupsController.index);
	App.get('/leaders', Http.UsersController.leaders);
	App.get('/login', Http.UsersController.login);
	App.post('/login', Passport.authenticate('local', {failureRedirect : '/login'}), Http.UsersController.postLogin);
	App.get('/analytics', Http.AnalyticsController.index);
	App.get('/analytics/getData', Http.AnalyticsController.getData);
	App.get('/stats', Http.StatsController.index);
	App.get('/search', Http.SearchController.index);
	App.get('/countries', Http.CountriesController.getCountries);	
	_.each(Config.auth, function(data, provider){
		App.get('/auth/' + provider, Http.AuthController.storeUrl);
		App.get('/auth/' + provider, Http.AuthController[provider]);
		App.get('/auth/' + provider, function(req, res) { res.redirect('/'); } );
		App.get('/auth/' + provider + '/callback', Http.AuthController[provider + 'Cb']);
	});
	
	App.get(/.*(png|jpg|svg|app|mp3|ogg\-opt|vendors)/, function(req, res, next) { 
		// on production, cache files
		if (Config.env == 'production') {
			if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=1000');
			if (!res.getHeader('Expires')) res.setHeader('Expires', 'Fri, 01 Mar 2013 20:51:01 GMT');
		}
		
		next();
	});
	
	App.get('/logout', Http.UsersController.logout);
	App.get('/*', Http.AppController.beforeRender);
	App.post('/*', Http.AppController.beforeRender);
	
	/**
	 * Start listening on set port an respond to http and WebSocekt requests
	 * @method startListening
	 */
	var startListening = function() {
		App.server.listen(Config.port, function() {
			Logger.info('Server started on port ' + Config.port );
			// run tests if required
			if (Config.test) {			require('./tests');
				var appTests = './../' + Config.app + '/tests/index.js';
				// Bug on with exsists Sync on windows
				if (require('fs').existsSync(appTests) || 1) {
					require(appTests);
				} 
			}
		});
	};

	
	/**
	 * A hack not to start listening to  connections till the connection is
	 * established to the db
	 * @method listenWhenDbReady
	 */  
	
	var listenWhenDbReady = function() {
		//Logger.debug('db state ')
		if (Db.getDb().state == 'connected') {
			startListening();
		} else {
			setTimeout(function() {
				
				listenWhenDbReady();
				
			}, 100);
		}
	};
	listenWhenDbReady();
	
	return App;
};

initServer(Basbosa('App'));
module.exports = Basbosa;