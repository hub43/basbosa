var Login = require('./login')
	,	clients = [];


var count = Config.testUsers;
count = 1;
diff = 100;

var f  = setInterval(function() {
	if (count--) {
		Logger.info('Bot user is entering, ' + count + ' bots remaining');
		Login.create(function(user) {	});
	} else {
		clearInterval(f);
	}
}, diff);

