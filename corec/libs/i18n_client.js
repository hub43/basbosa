define("libs/i18n_client", BasbosaConfig ? (BasbosaConfig.dictionaries || []) : [], function() {
	var locales = {}, dictionaries = BasbosaConfig ? (BasbosaConfig.dictionaries || []) : [];
	
	for (var i = 0; i < dictionaries.length ; i++) {
		lang = dictionaries[i].split('-')[1];
		locales[lang] = arguments[i];
	}
	
	var t = function(text) {
		var locale = j.user.get('locale');
		if (locales[locale] && locales[locale][text]) {
			return locales[locale][text];
		} else {
			if (locales[locale]) {
				$.get('/addText/' + locale  + '/' + encodeURIComponent(text));
			}
			return text;
		}
	};

	// Register the global t() function
	window.t = t;
});