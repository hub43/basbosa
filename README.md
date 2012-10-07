##Architecture Overview
Basbosa is a node.js framework that uses sockets.io to communicate with clients. Different clients from web or mobile phones should be able to connect to a an application running on Basbosa. 

All communication between client and server is done using messages that fires events. A message in Basbosa always consists of one object that holds all parameters needed and has a property eventName which holds the event name this message will fire. On the receiver side, when a certain message is received, an EventObject is created and passed to all handlers for the message. Handlers for a fired event are invoked in a certain order as explained in MessageHandlers . Below is a dump of an authentication message:


    { 
        eventName : "authn.login",
        nickname : "admin",
        password: : "e10adc3949ba59abbe56e057f20f883e",
        group_id : "1"
    }


Event names are always in the form of controller_name.message_name. Messages should always be sent from controllers either from client side or server side. An authn.login message is sent from authn controller and is primary handled by authn controller in the server side, other controllers may handle messages not primary intended to them. For example, the validate controller on the server listens to all events emitted by the receiving socket to make sure the message passes all validation rules before being handled by its intended controller.

A message that is a response to a certain message has a name that is the same as the original message padded with _result, e.g :auth.login_result.

An event that is fired on the client side UI and results in sending certain message to the server, is prefixes with "ui.", for example, when a user types a message and presses enter, the view Class fires the event ui.chat.public_message which is handled by chat controller that sends the chat.public_message

The above applies on both client and server.

## Communication Flow
![Message propagation diagram 'Text Formatting' Menu][comm]
[comm]: https://github.com/hub43/basbosa/raw/master/manual/img/comm.png

## Leveled Events
The *LeveledEvents* class provides functionality similar to Events class excepts that it allows handlers to place themselves in a certain order when listening to events. In order for an object to inherit from LeveledEvents, the object should already be instance of Events class as well. The SocketServer, SocketClient and J (application model on client side) are all instances of leveled events. The next handler for the event is only called when the current handler calls e.next(e)

In validate controller:
    
    socket.lon('*', 'first', function(e, message, next) {
        // If ok, call 
        next(e)
    }
    
In chat controller:

    core.on('chat.public_message', function(e) {
        e.result = {
		    eventName 			: 'chat.public_message_result',
		    broadcastTo	: 'room' + e.message.roomId,
		    message 			: e.message
	    }
	e.next(e);
    });
    
## Event Object
When a message is received, an *Event Object* is created and passed between handlers of the event and is used to keep track of the result for a certain message. Below is a dump for the event object created when a message is received. 


	var eventOb = {
		name 	: message.eventName, // The event name the message will fire
		socket	: socket, // socket instance message arrived on
		result	: null, // result object that is created as a result of handling this message
		message: message, // The message
		completed: [], // array of handlers that have already handled a message.
		next	: nextEvent // Function to be called on the event object by a handler after a certain handler is finished. 
	};


The above applies on both client and server.