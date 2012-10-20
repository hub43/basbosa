/**
 * StatsController is responsible on control the communication between Stats Model 
 * in the server side and the client side. 
 * @module Cores
 * @submodule CoresControllers
 * @class StatsController
 **/

/**
 * Index is used to load/route Stata page as a response on calling stats url '/stats'.
 * @method index
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.index = function (req, res) {
	//prepare the sector that have all active information about this sector.
	var sectors = [];
	j.group.sectors.each(function(sector) {
		sectors.push(sector.prepareForStats());
	});
	res.render(CORES + '/themes/views/stats', { title: 'Stats', sectors : sectors});
};