/**
 * SearchController is responsible on control the communication between Search Model 
 * in the server side and the client side. 
 * @module Cores
 * @submodule CoresControllers
 * @class SearchController
 **/

/**
 * Index is used to load/route Search page as a response on calling search url '/search'.
 * @method index
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 */
exports.index = function (req, res) {
	res.render(CORES + '/themes/views/search_on_users', { title: 'Search On Users'});
};