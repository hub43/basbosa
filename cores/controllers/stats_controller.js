
exports.index = function (req, res) {
	var sectors = [];
	j.group.sectors.each(function(sector) {
		sectors.push(sector.prepareForStats());
	});
	res.render(SERVER_PATH + '/themes/views/stats', { title: 'Stats', sectors : sectors});
};