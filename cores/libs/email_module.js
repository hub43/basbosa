if(typeof define !== 'function') { var define = require('amdefine')(module); }
define(['emailjs'], function(email) {
	var EmailModule = {
		defaultServer : {
			user:    '', 
		  password: '', 
		  host:    'localhost',
		  port: 25,
		},
	 	defaultMessage : {
		   text:    'Welcome to hub43', 
		   from:    'amahmoud@hub43.com', 
		   to:      'nfutoam.atef@gmail.com',
		   subject: 'testing emailjs'
		},
		sendMail : function(message , serverInfo) {
			var self = this;
			message = _.extend({}, self.defaultMessage, message);
			serverInfo= _.extend({}, self.defaultServer, serverInfo);
			var server  = email.server.connect(serverInfo);
			server.send(message, function(err, message) { console.log(err || message); });
		},
		
	};
	return EmailModule;
});




