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