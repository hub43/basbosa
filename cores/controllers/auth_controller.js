/**
 * AuthController is responsible on control the communication between Error Model 
 * in the server side and the client side. 
 * @module Cores
 * @submodule CoresControllers
 * @class AuthController
 **/
//define instance from passport model.
var passport = require('./components/passport').passport
	,	settings = { successRedirect: '/',  failureRedirect: '/login' }; 

_.each(Config.auth, function(data, provider) {
	module.exports[provider] = passport.authenticate(provider); 
	module.exports[provider + 'Cb'] = passport.authenticate(provider, settings);
}); 

module.exports.storeUrl = function(req, res, next) {
	req.session.redirect = req.header('Referer');
	next();
};