/**
 * ErrorController is responsible on control the communication between Error Model 
 * in the server side and the client side. 
 * @module Cores
 * @submodule CoresControllers
 * @class ErrorController
 **/
//define instamce form error model.
var Error		= require('../models/error');

/**
 * Index is used to check if the request has an error and if this error 
 * repeated more than 3 times respond with url this url contain a message of error 
 * "It seems that your need a newer browser to play our game. Please consider Google Chrome!" 
 * to the user. to know the user that is an error in his/her browser.
 * @method index
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 * @param {Fanction} next is used to go next.
 */
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

/**
 * ChangeBrowser is used to route to url called "/changeBrowser".
 * @method changeBrowser
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 * @param {Fanction} next is used to go next.
 */
exports.changeBrowser = function (req, res, next) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('It seems that your need a newer browser to play our game. Please consider Google Chrome!\n');
};
