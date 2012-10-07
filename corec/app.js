window.onerror = function(message, url, linenumber) {
  if (!jRaw.min || 1) return;
	var err = {errorMessage : JSON.stringify(message), url : url, linenumber : linenumber};
  var form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('action', window.location);

	for (var key in err) {
		if(err.hasOwnProperty(key)) {
			var hiddenField = document.createElement('input');
				hiddenField.setAttribute('type', 'hidden');
				hiddenField.setAttribute('name', key);
				hiddenField.setAttribute('value', err[key]);
				form.appendChild(hiddenField);
		}
	}

  document.body.appendChild(form);
  form.submit();
};

window.SERVER = false;
require.config({
	waitSeconds : 30,
	paths : {
		jquery			: 'corec/vendors/jquery-1.7.1.min',
	  socketio		: 'corec/vendors/socket.io-0.9.10',
	  underscore	: 'corec/vendors/underscore-1.3.1',
	  backbone		: 'corec/vendors/backbone-0.9.2',
		basbosa 		: 'corec/app'
	}
});

define([
  './models/j'  
	, './libs/index'
	, './themes/index'
	, './controllers/default_controller'
	, './vendors/viewporter'
	, './vendors/jade_runtime'
	, 'backbone'
	, 'jquery'
	, 'underscore'
	], function() {
		

});
