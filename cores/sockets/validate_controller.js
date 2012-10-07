/**
* Need to remember to drop messages on failed validation in production environment
* This could be a useful reminder tool for in-code todos/issues http://www.thecodebase.com/bang/
*/

var SocketServer		= require('./components/socket_server'),
		Validations			= require('./../libs').Validations,
		MessageTypes		= require(APP_PATH + '/apps/config/messages'),
		validated 			= {},
		unvalidated 		= {};

// Load Application sepecific messages
_.extend(MessageTypes, require(APP_PATH + '/apps/config/messages'));

/**
 * All external messages should have a senderUserId that holds 
 * the id of user who sent the message
 * The app emits internal messages. Such messages has the flag internalMessage = true
 */ 
SocketServer.on('connection', function(socket){
	socket.lon('*', 'first', function(e, message, next) {
		// most messages need senderUserId 
		socket.handshake && (message.senderUserId = socket.handshake.userId);
		
		// Find the message validator that corresponds to the current message
		var validator = _.filter(MessageTypes, function(fields, key) {
			return key == message.eventName;
		});

		// For security, if validation is not defined for a message
		// it should be dropped ==> Please check validations_module.js line #59
		// if(validator.length && Validations.validateWith(validator, e.message)) {
		
		if (message.internalMessage || Validations.validateWith(validator, message)) {
			validated[message.eventName] = _.extend({}, message);
			if (!message.internalMessage && message.eventName != 'authn.socket' && !socket.handshake.userId) {
				Logger.warn('Socket is not authenticated');
			} else {
				next();
			}
			
		} else {
			// For easy development, log a warning message but do not drop the message
			Logger.warn('The following message was not validated: ' + message.eventName);
			unvalidated[message.eventName] = _.extend({}, message);
			Logger.warn('unvalidated', unvalidated);
			next();
		}

	});
});


