var Country = require('../models/country'), country = new Country;

exports.getCountries = function (req, res) {
	var countryName = req.query['country'];
	function callBack(error , docs) {
		if (error) {
			Logger.info('in error');
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
	country.getCountries(countryName, callBack);
};