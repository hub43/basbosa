/*
 * Bootstrap the app, register Basbosa as Global, 
 * set config and parse command lines
 */ 
require('./config/bootstrap');

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
	//, Passport 			= require('./controllers/components/passport').passport
	, Store					=	require('./libs').Store
	//, JadeCompiler	= require('./libs/').JadeCompiler
	//, Http 					= AppDirLoad(__dirname + '/controllers')
	//, SocketServer 	= require('./sockets/components/socket_server')
	, Path					= require('path')
	, BasbosaAssets = require('basbosa-assets')
	, BasbosaHelpers = require('basbosa-helpers');



	// Init Socket	
	//SocketServer.init(App);
	
	// Load Sockets controllers
	//AppDirLoad(__dirname + '/sockets');
	
	App.configure(function() {

    // Allow to server static files both from APP_PATH and from node_modules/basbosa
    App.use(Express.static(Basbosa('Config').get('appPath'))); // can't find a matching route, tell express where our statics live
    App.use(Express.static(Basbosa('Config').get('appPath') + '/appc/public'));
    App.use(Express.static(Path.dirname(Path.dirname(__filename))));

    App.set('views', Basbosa('Config').get('appPath')); // tell express where our templates live
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

	//	App.use(Passport.initialize()); // initialize passport
	//	App.use(Passport.session()); // setup its session handling
	//	App.use(JadeCompiler);
	//	App.use(flash());
		App.use(App.router); // push our routing table to the stack
		
		// Blocking access to application files should be done here
		
		// On development, prevent caching to easy change files
		if (Basbosa('Config').get('env').indexOf('development') > -1) {
			App.use(function (req, res, next) {
		    res.setHeader('Pragma-directive', 'no-cache');
		    res.setHeader('Cache-directive', 'no-cache');
		    res.setHeader('Cache-control', 'no-cache');
		    res.setHeader('Pragma', 'no-cache');
		    res.setHeader('Expires', '0');
		    next();
			});
		}
		App.use(Express.compress({filter : function(req, res) {
			return /json|text|javascript|xml/.test(res.getHeader('Content-Type'));
		}}));
		

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

//	App.get('/*', Http.AppController.beforeAction);
//	App.post('/*', Http.AppController.beforeAction);
//	App.get('/addText/:locale/:text', Http.AppController.addText);
//	App.post('/', Http.ErrorsController.index);
//	App.get('/changeBrowser', Http.ErrorsController.changeBrowser);
//	App.get('/', Http.GroupsController.index);
//	App.post('/', Http.GroupsController.index);
//	App.get('/leaders', Http.UsersController.leaders);
//	App.get('/login', Http.UsersController.login);
//	App.post('/login', Passport.authenticate('local', {failureRedirect : '/login', failureFlash: true,
//		successRedirect: Basbosa('Config').get('successLogin')}), Http.UsersController.postLogin);
//	App.get('/analytics', Http.AnalyticsController.index);
//	App.get('/analytics/getData', Http.AnalyticsController.getData);
//	App.get('/stats', Http.StatsController.index);
//	App.get('/search', Http.SearchController.index);
//	App.get('/countries', Http.CountriesController.getCountries);
//
//	_.each(Basbosa('Config').get('auth'), function(data, provider){
//		App.get('/auth/' + provider, Http.AuthController.storeUrl);
//		App.get('/auth/' + provider, Http.AuthController[provider]);
//		App.get('/auth/' + provider, function(req, res) { res.redirect('/'); } );
//		App.get('/auth/' + provider + '/callback', Http.AuthController[provider + 'Cb']);
//	});
	

	
//	App.get('/logout', Http.UsersController.logout);
//	App.get('/*', Http.AppController.beforeRender);
//	App.post('/*', Http.AppController.beforeRender);


    App.get(/.*(png|jpg|svg|app|mp3|ogg\-opt|vendors)/, function(req, res, next) {
        // on production, cache files
        if (Basbosa('Config').get('env').indexOf('production') > -1) {
            if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=1000');
            if (!res.getHeader('Expires')) res.setHeader('Expires', 'Fri, 01 Mar 2013 20:51:01 GMT');
        }

        next();
    });

	App.locals.bAssets = new BasbosaAssets(Basbosa('Config').get('requireJsOptions'));
	App.locals.Html = BasbosaHelpers.Html;
	App.locals.Text = BasbosaHelpers.Text;
	
	/*
	 * Populate client config
	 * 
	 */
	App.locals.BasbosaConfig = {};
	Basbosa('Config').get('clientConfig').forEach(function(varName) {
	  App.locals.BasbosaConfig[varName] = Basbosa('Config').get(varName); 
	});
	
	/*
	 * Pre compile templates
	 */
	if (Basbosa('Config').get('tmplPrecompile')) {
	  var tmplPrecompile = require('tmpl-precompile');
	  tmplPrecompile.precompile(Basbosa('Config').get('tmplPrecompile'), APP_PATH);
	}
	
	/*
	 * Start listening on set port and respond to http and WebSocekt requests
	 * 
	 */

  if (!Basbosa('Config').get('skipHttpServer')) {
    function startServer() {
      App.server.listen(Basbosa('Config').get('port'), function() {
        Basbosa('Logger').info('Server started on port ' + Basbosa('Config').get('port'));
      });
    }
    if (Basbosa('Config').get('skipWaitForDb') || Basbosa('Config').get('useFsModel')) {
      startServer();
    } else {
      Basbosa('Cm').on('connected:default', startServer);
    }
  }

	
	return App;
};

initServer(Basbosa('App'));
module.exports = Basbosa;