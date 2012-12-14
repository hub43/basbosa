var	I18n		= require('../libs/i18n');

exports.beforeAction = function(req, res, next) {
	res.view = '';
	res.viewVars = {
		Config			: Config,
		title				: 'JSGroups',
		j			: null,
	};
	next();
};

exports.addText = function(req, res) {
	Basbosa('Logger').debug('Adding ' + req.param('text') + ' to local ' + req.param('locale'));

	I18n.set({original: req.param('text'), locale: req.param('locale')}, t(req.param('text')));
	res.send('Thanks for requesting to add: ' + req.param('text'));
	
};

exports.beforeRender = function(req, res, next) {
	res.view ? res.render(res.view, res.viewVars) : next();
};
