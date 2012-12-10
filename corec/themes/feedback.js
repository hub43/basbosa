define([
		'require'
	,	'backbone'
	, 'basbosa-registry'
	], function(require) {
	var FeedbackView = Backbone.View.extend({
		initialize : function() {
			this.render();						
		},
		
		render : function() {
			var feedback = $('<div>').attr('id', 'feedback-box');
			var link = $('<a>')
				.attr({'href' : Basbosa('Config').get('feedbackUrl'), 'target' : '_blank'})
				.html(t('Feedback'));
			feedback.append(link);
			$('body').append(feedback);
		}
	});
			
	Basbosa && Basbosa.add('FeedbackView', FeedbackView);
	return FeedbackView;
});
		
		
