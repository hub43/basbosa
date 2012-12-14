if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['fs', 'jade', 'path'], function(Fs, Jade, Path) {
	var options = {
			publicBase:	PUBLIC_PATH
		,	baseDirs 	: APP_PATH
		,	encoding	: 'utf-8'
	};
	return function ClientJadeCompiler(req, res, next) {
		// Only handle .jade.js files
		if (req.url.indexOf('.jade.js') > -1) {
			var localFile = APP_PATH + req.url.replace('.jade.js', '.jade');
			jadeTemplate = Fs.readFileSync(localFile, options.encoding);
			requireJsCompiledJade = 'define(function(){return ' + Jade.compile(jadeTemplate, {client:true}) + '});';
			Basbosa('Logger').debug('Sending file: ' + localFile);
			res.send(requireJsCompiledJade);
			//Fs.writeFileSync(localFile + '.js', requireJsCompiledJade, options.encoding);

		} else {
			next();
		}

	};
});