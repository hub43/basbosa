/**
 * UsersController is responsible on control the communication between User Model 
 * in the server side and the client side. 
 * @module Cores
 * @submodule CoresControllers
 * @class UsersController
 **/
// define instance from user model.
var User = require('./../models/index').User;
/**
 * login is a method used to redirect to log in view to allow to the user to log in.
 * @method login
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 * @param {Fanction} next it is used to go next. 
 */
exports.login = function(req, res, next) {
	 res.view = j.user.theme + '/views/index';
	 res.view = '/themes/html/views/users/login';
	 next();
};
/**
 * postLogin is a method used to check on user is logged in, if so add user to online users.
 * @method postLogin
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.postLogin = function(req, res) {
	// Check user is logged in, if so add user to online users
	if (req.user && req.user._id) {
		res.send(req.user);
	}
};
/**
 * leaders is a method used to get the leaders from the data base.
 * @method leaders
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.leaders = function(req, res) {
	var q = req.query;
	User.prototype.getLeaders(function(err, result) {
		res.send(result);
	}, q.startTime, q.endTime, q.sectorId, req.user.fb_user_id, q.country, q.city);
	
};

/**
 * logout is a method used to log out.
 * @method logout
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

/**
 * account is a method used to load the account.
 * @method account
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.account = function(req, res) {
	res.render('users.login', { user: req.user });
};