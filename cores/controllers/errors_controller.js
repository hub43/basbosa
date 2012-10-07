var Error		= require('../models/error');

exports.index = function(req, res, next) {
	if (req.body.errorMessage) {
		var error = new Error();
		if (error.createError(req) > 3) {
			res.redirect('/changeBrowser');
			Logger.warn(error.toJSON());
			return;
		};
	} 
	next();
};

exports.changeBrowser = function (req, res, next) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('It seems that your need a newer browser to play our game. Please consider Google Chrome!\n');
};
