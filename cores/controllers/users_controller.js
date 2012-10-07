var User = require('./../models/index').User;

exports.login = function(req, res, next) {
	 res.view = j.user.theme + '/views/index';
	 res.view = '/themes/html/views/users/login';
	 next();
};

exports.postLogin = function(req, res) {
	// Check user is logged in, if so add user to online users
	if (req.user && req.user._id) {
		res.send(req.user);
	}
};

exports.leaders = function(req, res) {
	var q = req.query;
	User.prototype.getLeaders(function(err, result) {
		res.send(result);
	}, q.startTime, q.endTime, q.sectorId, req.user.fb_user_id, q.country, q.city);
	
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};

exports.account = function(req, res) {
	res.render('users.login', { user: req.user });
};