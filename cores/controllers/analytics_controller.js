/**
 * AnalyticsController is responsible on control the communication between Analytics Model 
 * in the server side and AnalyticsController in the Opposite side "client side. 
 * @module Cores
 * @submodule CoresControllers
 * @class AnalyticsController
 **/
// define instance from Analytics model.
var Analytics = require('../models/analytics'), analytics = new Analytics;

/**
 * AllowedAccess is a method used to check if the user is Administrator
 * or he/she is just visitor and allow Access to the Admin only. 
 * @method allowedAccess
 * @param {String} req hold the request that come from the client,
 * this request has information on the user that request to enter. 
 * @param {String} res the response that will hold the message to the client.
 * @return true if the user is 'Admin' else false and respond 
 * with message 'You are not allowed' to the client. 
 */
function allowedAccess (req, res) {
	// Temp disable
	if (req.user.group != 'admins' && 0) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('You are not allowed\n');
		return false;
	}
	return true;
};

/**
 * Index is a method used to load/route Analytics page as a response on calling analytics url '/analytics'.
 * @method index
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.index = function (req, res) {
	if (allowedAccess(req,res)) {
		res.render(CORES + '/themes/views/analytics', { title: 'Analytics' });
	}
};

/**
 * GetData is a method used to call the desired function that related 
 * to the client request from Analytics model.
 * @method getData
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.getData = function (req, res) {
	// check if the user not Admin don't allow for he/she to enter any routes in the page
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
			analytics[req.query['statsType']](req.query['userId'],callBack);
		} else {
			var startTime = parseInt(req.query['startTime'])
				, endTime = parseInt(req.query['endTime']);
			req.query['statsType'] == 'search' ? analytics[req.query['statsType']](req.query['userName'], callBack) 
					: analytics[req.query['statsType']](startTime , endTime , callBack);
		}		
	} else {
		Logger.error('You are not allowed to enter that');
	}
};
