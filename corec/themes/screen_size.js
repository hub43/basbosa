define([
    'jquery'
   ,'backbone'
	], function() {
	var ScreenSizeView = Backbone.View.extend({
		id	: 'screen-size',
		
		initialize : function() {
			var self = this;
			this.$el.css ({
				'position' : 'fixed',
				'top'				: 0,
				'width'			: '100px',
				'height'		: '20px'
					
			});
			$('body').append(this.$el);
			$(window).resize(function() {
				self.render();
			});
			window.setInterval(function(){
				self.render();
			}, 3000);
			this.render();
						
		},
	
		render : function() {
			this.$el.html('width: ' + $(window).width() + 'px, height: ' + $(window).height());
		},
		
	});
	
	Basbosa && Basbosa.add('ScreenSizeView', ScreenSizeView);
	return ScreenSizeView;
});
		
		
