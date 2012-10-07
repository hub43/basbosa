var Analytics = require('../models/analytics'), analytics = new Analytics;
var User = require('../models/user'), user = new User;

//function to check on the user access
function allowedAccess (req,res) {
	// Disable acees control for analytics for now
	if (0 && req.user.group != 'admins') {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('You are not allowed\n');
		return false;
	}
	return true;
	
};
exports.index = function (req, res) {
	if (allowedAccess(req,res)) {
		res.render(SERVER_PATH + '/themes/views/analytics', { title: 'Analytics' });
	}
	
};
exports.getData = function (req, res) {
	// check if the user not admins don't allow for he/she to enter any routes in the page
	if (allowedAccess(req,res)) {
			function callBack(error , docs) {
				if (error) {
					Logger.error(error);
					res.writeHead(500);
					res.end();
				} else {
					Logger.info(docs);
					res.writeHead(200, {'content-type': 'application/json'});
					res.write (JSON.stringify(docs));
					res.end();
				}
			}
			if (req.query['statsType'] === 'getVisits') {
				user[req.query['statsType']](req.query['userId'],callBack);
			} else {
				var startTime = parseInt(req.query['startTime']);
				var endTime = parseInt(req.query['endTime']);
				req.query['statsType'] == 'search' ? analytics[req.query['statsType']](req.query['userName'], callBack) : analytics[req.query['statsType']](startTime , endTime , callBack);
			}		
	}
};
