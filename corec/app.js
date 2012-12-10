window.onerror = function(message, url, linenumber) {
	$.post(window.location, {
		errorMessage : JSON.stringify(message), 
		url : url, 
		linenumber : linenumber
	});
};

window.SERVER = false;
require.config({
	waitSeconds : 30,
	paths : {
		jquery			: 'corec/vendors/jquery-1.7.1.min',
	  socketio		: 'corec/vendors/socket.io-0.9.10',
	  underscore	: 'corec/vendors/underscore-1.3.1',
	  backbone		: 'corec/vendors/backbone-0.9.2',
		basbosa 		: 'corec/app',
		'basbosa-config' 		: 'node_modules/basbosa-config/index',
		'basbosa-logger' 		: 'node_modules/basbosa-logger/index',
		'basbosa-registry' 	: 'node_modules/basbosa-registry/index',
	},
	shim : {
		'basbosa-config' : ['basbosa-registry'],
		'basbosa-logger' : ['basbosa-registry']
	}
});

define([
  './models/j'  
	, './libs/index'
	, './themes/index'
	, './controllers/default_controller'
	, './vendors/viewporter'
	, './vendors/jade_runtime'
	, 'jquery'	, 'underscore'
	, 'backbone'
	], function() {
	
});