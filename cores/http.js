/**
 * Core Server Application
 * The core Server Application receives an instance of the created express application
 * and start attaching request handlers and configure the express application
 * @module Cores
 * @class CoresApp
 */
var CreateHttpServer = function(B) {

  /* Loading express and Creating the main server instance */
  var express = require('express');
  var App =  express();
  App.server = require('http').createServer(App);

  B.add('App', App);

  var	Express 		= require('express')
      , Path					= require('path')
      , BAssets = require('basbosa-assets')
      , BHelpers = require('basbosa-helpers');


  App.configure(function() {

    // Allow to server static files both from APP_PATH and from node_modules/basbosa
    App.use(Express.static(B('Config').get('appPath'))); // can't find a matching route, tell express where our statics live

    // On production, these paths shouldn't be public
    App.use(Express.static(B('Config').get('appPath') + '/appc/public'));
    App.use(Express.static(Path.dirname(Path.dirname(__filename))));

    App.set('views', B('Config').get('appPath')); // tell express where our templates live
    App.set('view engine', 'jade'); // we are using jade for as template engine
    App.set('view options', {	layout : false }); // disable layouts by default

    App.use(Express.bodyParser()); // prepare body parser middleware for http form posts parsing/ url params handling
    App.use(Express.methodOverride()); // prepare http method override to support unsupported http methods ex: delete, put
    App.use(Express.cookieParser()); // for parsing session cookies

    // Check if we will use session
    if (B('Config').get('sessionsEnabled') && B('Config').get('db').database) {
      B('Logger').trace('Using sessions in db', B('Cm').getDbUrl());
      var mongoStore = require('connect-mongo')(express);
      App.use(express.session({
        secret : B('Config').get('sessionsSecret'),
        store : new mongoStore({
          url : B('Cm').getDbUrl()
        })
      }));

      // Check if we will use passport
      if (B('Config').get('passportEnabled')) {
        require('./libs/passport')(B);
      }

    }




    App.use(App.router); // push our routing table to the stack

    // Blocking access to application files should be done here

    // On development, prevent caching to easy change files
    if (B('Config').get('env').indexOf('development') > -1) {
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


  App.get(/.*(png|jpg|svg|app|mp3|ogg\-opt|vendors)/, function(req, res, next) {
    // on production, cache files
    if (B('Config').get('env').indexOf('production') > -1) {
      if (!res.getHeader('Cache-Control')) res.setHeader('Cache-Control', 'public, max-age=1000');
      if (!res.getHeader('Expires')) res.setHeader('Expires', 'Fri, 01 Mar 2013 20:51:01 GMT');
    }

    next();
  });

  App.locals.bAssets = new BAssets(B('Config').get('requireJsOptions'));
  App.locals.Html = BHelpers.Html;
  App.locals.Text = BHelpers.Text;

  /*
   * Populate client config
   *
   */
  App.locals.BConfig = {};
  B('Config').get('clientConfig').forEach(function(varName) {
    App.locals.BConfig[varName] = B('Config').get(varName);
  });

  /*
   * Pre compile templates
   */
  if (B('Config').get('tmplPrecompile')) {
    var tmplPrecompile = require('tmpl-precompile');
    tmplPrecompile.precompile(B('Config').get('tmplPrecompile'), B('Config').get('appPath'));
  }

  /*
   * Start listening on set port and respond to http and WebSocekt requests
   *
   */

  if (!B('Config').get('skipHttpServer')) {
    function startServer() {
      App.server.listen(B('Config').get('port'), function() {
        B('Logger').info('Server started on port ' + B('Config').get('port'));
      });
    }
    if (B('Config').get('skipWaitForDb') || B('Config').get('useFsModel')) {
      startServer();
    } else {
      B('Cm').on('connected:default', startServer);
    }
  }

  return App;
};


module.exports = CreateHttpServer;