define(function() {
	if (typeof jRaw !== 'undefined') {
		require(['appc/build/dictionary-ar', 'appc/build/dictionary-fr'], function(ar, fr) {
    		var locales = {
    				'ar'	:	ar,
    				'fr'	: fr
    			};
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
	}
	
});