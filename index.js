// Bootstrap Basbosa on the nodejs server
/*
 * Bootstrap the app, register Basbosa as Global,
 * set config and parse command lines
 */
require('./cores/config/bootstrap');

// Start Http Server if needed
require('./cores/http')(Basbosa);


module.exports = Basbosa;