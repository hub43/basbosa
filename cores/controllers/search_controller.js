exports.index = function (req, res) {
	res.render(SERVER_PATH + '/themes/views/search_on_users', { title: 'Search On Users'});
};