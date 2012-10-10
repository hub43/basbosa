
exports.index = function (req, res) {
	var sectors = [];
	j.group.sectors.each(function(sector) {
		sectors.push(sector.prepareForStats());
	});
	res.render(CORES + '/themes/views/stats', { title: 'Stats', sectors : sectors});
};