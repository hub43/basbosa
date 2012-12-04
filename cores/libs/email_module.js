if(typeof define !== 'function') { var define = require('amdefine')(module); }
define(['../../node_modules/emailjs/email'], function(email) {
	var EmailModule = {
		defaultServer : {
			user:    '', 
		  password: '', 
		  host:    'localhost',
		  port: 25,
		  ssl:     true
		},
	 	defaultMessage : {
		   text:    'Welcome to hub43', 
		   from:    ' @hub43.com', 
		   to:      'amahmoud@hub43.com',
		   subject: 'testing emailjs'
		},
		sendMail : function(message , serverInfo) {
			var self = this;
			_.extend(self.defaultMessage, message);
			_.extend(self.defaultServer, serverInfo);
			var server  = email.server.connect(self.defaultServer);
			server.send(self.defaultMessage, function(err, message) { console.log(err || message); });
		},
		
	};
	return EmailModule;
});




