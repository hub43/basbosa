define(['backbone', 'jquery', 'basbosa-registry'], function() {
	var Assets = Backbone.Model.extend({
		
		defaults : {
			total 	: 0,
			loaded	: 0,
			progress: 0,
			base		: '',
			prefix	: ''
		},
		
		
		
		initialize	: function() {
			this.loadedAssets = [];
			this.customEvents = [];
			this.on('change:loaded change:total', this.updateProgress, this);
		},
	
		/*
		 * Preloads certain images
		 */
		loadImages : function(assets) {
			var assetUrl, i, self = this;
			this.set('total', this.get('total') + assets.length);;
			for(i = 0; i < assets.length; i++) {
				assetUrl = this.get('base') + this.get('prefix') + assets[i];
				$('<img>').attr('src', assetUrl).load(function() {
					self.set('loaded', self.get('loaded') + 1);
				});
			}
		},
		
		/**
		 * Add a custom load task with a certain weight
		 */
		addCustomEvent : function(eventName, weight) {
			this.customEvents[eventName] = weight;
			this.set('total', this.get('total') + weight);
		},
		
		/** 
		 * A custom event is done
		 */
		loadedCustomEvent : function(eventName) {
			this.set('loaded', this.get('loaded') + this.customEvents[eventName]);
		},
		
		updateProgress : function() {
			Logger.trace('Assets loaded ' + this.get('loaded') + ' this total ' + this.get('total'));
			var progress = Math.ceil(this.get('loaded') / this.get('total') * 100);
			this.set('progress', progress);
			progress == 100 && this.trigger('loadComplete');
		},
	
	});
	Basbosa && Basbosa.add('Assets', Assets);
	return Assets;
});
