define([
	'require', 
	'backbone', 
	'jquery',
	'./../vendors/jquery.jplayer.min'
	, 'basbosa-registry'
], function(require) {
	var SoundView = Backbone.View.extend({
		
		initialize : function() {
			this.domBindings();
			this.model.on('change', this.changeEnableMusic, this);
		},
				
		domBindings : function() {
			var self = this;
			$('body').append($('<div>').attr('id', 'jplayer-music'));
			$('body').append($('<div>').attr('id', 'jplayer-sound1'));
			$('body').append($('<div>').attr('id', 'jplayer-sound2'));

			// Start the music on iphone with user clicks
			$('body').click(function() {
				if (self.model.get('music')) $('#jplayer-music').jPlayer('play');
			});
			
			$('#jplayer-music').jPlayer({
				ready: function () {
					$(this).jPlayer('setMedia', {
						mp3: jRaw.themeBase + '/sounds/magic.mp3',
						ogg: jRaw.themeBase + '/sounds/magic.ogg',
					}).jPlayer('play');
				},
				swfPath: jRaw.coreBase + '/vendors/',
				supplied: 'mp3, ogg',
				volume 	: 0.6,
				loop 		: true,					
			});
			
			// Set 2 channels for sounds
			$('#jplayer-sound1').jPlayer({
				swfPath: jRaw.coreBase + '/vendors/',
				supplied: 'mp3, ogg'
			});
			
			$('#jplayer-sound2').jPlayer({
				swfPath: jRaw.coreBase + '/vendors/',
				supplied: 'mp3, ogg'
			});

		},
		
		play : function(sound) {
			if (!this.model.get('enableSound') || !sound) return;
			var soundSelector = '#jplayer-sound1'; 
			if (!$('#jplayer-sound1').data('jPlayer').status.paused) {
				soundSelector = '#jplayer-sound2';
			}
			
			Logger.debug('using channel ' + soundSelector);
			$(soundSelector).jPlayer('setMedia', {
				mp3: jRaw.themeBase + '/sounds/' + sound + '.mp3',
				ogg: jRaw.themeBase + '/sounds/' + sound + '.ogg',
			}).jPlayer('play');
		},
		
		music : function(music, loop) {		
			typeof (loop == 'undefined') && (loop = true);
			if (!this.model.get('enableMusic') || !music) return;
			Logger.info('music function called to play ' + music);
			$('#jplayer-music').jPlayer('setMedia', {
					mp3: jRaw.themeBase + '/sounds/' + music + '.mp3',
					ogg: jRaw.themeBase + '/sounds/' + music + '.ogg',
				}).jPlayer({
				loop : loop,
				ready: function () {
					$(this).jPlayer('setMedia', {
						mp3: jRaw.themeBase + '/sounds/' + music + '.mp3',
						ogg: jRaw.themeBase + '/sounds/' + music + '.ogg',
					}).jPlayer('play');
				}
			}).jPlayer('play');
		},
		
		changeEnableMusic : function() {
			$('#jplayer-music').jPlayer(this.model.get('enableMusic') ? 'play' : 'stop');
		},
		
	});
	
	Basbosa && Basbosa.add('SoundView', SoundView);
	return SoundView;
});
		
		
