/**
 * Country Model provide the core of dealing with data base special countries collection 
 * @module Cores
 * @submodule CoresModels
 * @class Country
 * @property collectionName hold the name of the collection.
 * @property country hold the name of the country.
 * @property cities hold array of cities in this country.
 **/
if (typeof define !== 'function') { var define = require('amdefine')(module); }
define (['backbone'], function () {
	//define Country Model
	var Country = Backbone.Model.extend({
		collectionName : 'countries',						//define the collection that this class will deal with it.
		defaults : {
			country	: '',
			cities	: []
		},
		/**
		 * AddCity is a method used to update countries collection with new country and new city.
		 * @method addCity
		 * @param {String} country hold country name.
		 * @param {String} city hold city name.
		 */
		addCity : function (country, city) {
			this._withCollection(function(error, collection) {
				if (error) {
					Logger.error(error);
				} else {
		      collection.update({country: country}, {$push: {'cities' : city}}, {}, function(error) {
		      	if(error) {
		      		Logger.warn('country does not exsit or error in update city of this country' + error);
		      	}
		      });
				}
			});
		},
		/**
		 * GetCountries is a method used to get countries from data base.
		 * @method getCountries
		 * @param {String} country hold country name that we need to search on it.
		 * @param {Function} callback(error/null, results) A callback function on the country object
		 * return in success with all countries that related to country.
		 */
		getCountries : function (country, callback) {
			var query = {}, options = {};
			if (country) query.country = country;
			options.success = function (results) {
				callback (null, results);
			};
			options.error = function (error) {
				callback (error);
			};
			this.find(query, options);
		}
	});
	
	return Country;
});