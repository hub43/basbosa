/**
 * CountryController is responsible on control the communication between Country Model 
 * in the server side and the client side. 
 * @module Cores
 * @submodule CoresControllers
 * @class CountryController
 **/
//define instance from country model.
var Country = require('../models/country'), country = new Country;

/**
 * GetCountries is used to get the countries from database when the request is '/countries'.
 * @method getCountries
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.getCountries = function (req, res) {
	var countryName = req.query['country'];
	function callBack(error , docs) {
		if (error) {
			Basbosa('Logger').info('in error');
			Basbosa('Logger').error(error);
			res.writeHead(500);
			res.end();
		} else {
			Basbosa('Logger').info(docs);
			res.writeHead(200, {'content-type': 'application/json'});
			res.write (JSON.stringify(docs));
			res.end();
		}
	}
	country.getCountries(countryName, callBack);
};