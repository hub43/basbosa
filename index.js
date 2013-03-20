// Bootstrap Basbosa
require('./cores/config/bootstrap');

// Start Http Server if needed
if (Basbosa('Config').get('skipHttpServer') === false) {
  require('./cores/http')
}

// Start translation server if enabled
if (Basbosa('Config').get('enableDialectHttp')) {
  var DialectHttp = require('dialect-http');
  _.extend(DialectHttp.options, Basbosa('Config').get('dialectHttp'));
  DialectHttp.run();
}
module.exports = Basbosa;