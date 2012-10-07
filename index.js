// Start Basbosa backend server and load handlers
require('./cores/app');
// Build client app
require('./cores/libs/require_opt');
// Start Application backend server
require('../../apps/app')();

// Start translation server
var DialectHttp = require('dialect-http');
_.extend(DialectHttp.options, Config.dialectHttp);
DialectHttp.run();
