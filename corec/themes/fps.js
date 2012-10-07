define([
		'require'
	,	'backbone'
	], function(require) {
	var FpsView = Backbone.View.extend({
		initialize : function() {
			this.qos 		= 100;
			this.qosPenalty = 1;
			this.calcFps = 0;
			this.minFps = 20;
			this.lastCalled = 0;
		
			this.render();
			this.bind();
						
		},
	
		bind : function(){
			var self = this;
			// Check if we are using Crafty or our own custom animation
			function cb() {
				self.calcFps++;
			}

			$(function(){
				if (typeof Crafty !== 'undefined')	{
					Crafty.bind('EnterFrame', cb);
				} else {
					self.$el.startAnimation(cb);
				}
			});
			
			
			// Update the display every 1 second
			setInterval(function() {
				self.fps = self.calcFps;
				self.fps < self.minFps && (self.qos -= self.qosPenalty); 
				self.$el.html(self.fps + ' fps' + ' / qos: ' + self.qos);
				self.calcFps = 0;
	
			}, 1000);
			
		},
		
		render : function() {
			this.$el = $('<div>').css({
				position 	: 'absolute',
				bottom 		: 0,
				right			: 0,
				width			: 200,
				height		: 30,
				background: 'rgba(256,256,256,0.2)',
				'z-index'	:1000			
			}).attr('id', '#fps');
			$('body').append(this.$el);
		}
	
	});
	
	Basbosa && Basbosa.add('FpsView', FpsView);
	return FpsView;
});
		
		
