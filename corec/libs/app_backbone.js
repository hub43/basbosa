if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(['backbone'], function() {
	
	// Note we are changing the global backbone variable
	
	/*
	 * Provide a default initialize that calls our 4 init functions 
	 */
	Backbone.Model.prototype.initialize = function(options) {
		if (options && options.parent) {
			this._parent = options.parent;
			this.unset('parent');
		}
		
		var functions = ['initCoreC', 'initCoreS', 'initAppC', 'initAppS'];
		
		for(var i = 0, len = functions.length; i < len; i++) {
			if (typeof this[functions[i]] === 'function') {
				this[functions[i]].apply(this, arguments);
			}
		}	
	};
	/*
	 * Add a function to update collection models from
	 * an array of json objects
	 */
	
	Backbone.Collection.prototype.updateModels = function(models, options) {
		var m, tmpData;
		for(var i = 0; i < models.length; i ++) {
			tmpData = _.extend({}, models[i], options);
			if (models[i].id) {
				m = this.get(models[i].id);
				m ? m.set(models[i], {silent : true}) : this.add(tmpData);	
			} else {
				this.add(tmpData);
			}
		}
		
	};
	
	/*
	 * If a model with the id exists, remove it and add this model
	 */
	Backbone.Collection.prototype.replace = function(model) {
		var id = model.id || model._id;
		this.remove(id);
		return this.add(model);
		
	};
	
	/*
	 * Supply a new function for events that binds to events once
	 */
	Backbone.Model.prototype.once = function(events, callback, context) {
		this.off(events, callback, context);
		this.on(events, callback, context);
	};
	
  return Backbone;
});