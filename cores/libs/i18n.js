var	Dialect 	= require('dialect')
	, Fs 				= require('fs');

var dialect = Dialect.dialect(Config.dialect);

dialect.connect(function() {
	dialect.sync({
		interval : 3600
	}, function() {
		// Save the dictionary to the client build folder
		for (locale in dialect.dictionaries) {
			Basbosa('Logger').debug(APP_PATH + '/appc/build/dictionary-' + locale);
			var requireJsDictionary =  'define(function(){return ' + JSON.stringify(dialect.dictionaries[locale]) + '});';
			Fs.writeFile(APP_PATH + '/appc/build/dictionary-' + locale + '.js', requireJsDictionary);
		}
	});

	// Override global dummy t() function with real translation function
	GLOBAL.t = dialect.get;
});

module.exports = dialect;