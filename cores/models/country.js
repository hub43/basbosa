if (typeof define !== 'function') { var define = require('amdefine')(module); }

define (['backbone'], function () {
	
	var Country = Backbone.Model.extend({
		collectionName : 'countries',
		
		defaults : {
			country	: '',
			cities	: []
		},
		
		// doesn't check if city already exists
		addCity : function (country, city) {
			this._withCollection(function(err, collection) {
				if (err) {
					Logger.error(err);
					return;
				}
		        collection.update({country: country}, {$push: {'cities' : city}}, {}, function(err) {});
			});
		},
		
		getCountries : function (country, cb) {
			var query = {}, options = {};
			if (country) query.country = country;
			options.success = function (results) {
				cb (null, results);
			};
			options.error = function (err) {
				cb (err);
			};
			this.find(query, options);
		}
		
	});
	
	return Country;
});