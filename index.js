// Start Basbosa backend server and load handlers
require('./cores/app');
// Build client app
require('./cores/libs/require_opt');

// Start Application backend server if it exists
if (require('fs').existsSync(SERVER_PATH + '/app.js')) {
	require('../../apps/app')();
}


// Start translation server
var DialectHttp = require('dialect-http');
_.extend(DialectHttp.options, Basbosa('Config').get('dialectHttp'));
DialectHttp.run();