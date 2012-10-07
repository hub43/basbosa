define([
		'./components/socket_client'
	, '../models/private_chat'
	, '../models/j'
	], function(SocketClient, PrivateChat, j) {

	SocketClient.lon('chat.message_result', function(e, message, next) {
		
		// Check if activity exist
		if (j.user.activities.get(message.activityId)) {
			j.user.activities.get(message.activityId).messages.add(message);
		} else {
			// Get activity 
			var activity = j.group.getActivity((message.activityId));
		
			// The activity is a private chat
			if (!activity){
				j.group.findUserById(message.userId, function(user) {
					if (user) { 
						j.user.addActivity(new PrivateChat({
							_id		:	message.activityId,
							name	: user.get('username')
						}));
						j.user.activities.get(message.activityId).messages.add(message);
						next();
					}					
				});
				
			} else {
				j.user.addActivity(activity);
				j.user.activities.get(message.activityId).messages.add(message);
				next();
			}	
		} 
		
	});

	j.lon('ui.chat.message', function(e, message, next) {
		// When a message is sent, add it to local messages to be displayed
		var activity = j.user.activities.get(message.activityId);
		var localMessage = _.extend({}, message);
		localMessage.senderUser = j.user.toJSON();
		activity.messages.add(localMessage);
		// If the activity is a private chat, add users ids to the message
		if (activity.get('type') == 'PrivateChat') {
			message.users = new Array();
			activity.users.each(function(user) {
				message.users.push(user.id);
			});
		}
		next();

	});

	j.lon('ui.private_chat.request', function(e, message, next) {
		// First check if there are any private chat windows with this user,
		// if there are none ...
		j.group.findUserById(message.targetUserId, function(user) {
			var activityId = j.user.getUuid();
			j.user.addActivity(new PrivateChat({
				name	: user.get('username'),
				_id		: activityId,
			}));
			j.user.activities.get(activityId).users.add(user);
		});
		next();

	});

	return null;
});
