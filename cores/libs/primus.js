var primus = require('primus');

module.exports = function(B) {

  var primusServer = new primus(B('App').server, {

  });
  primusServer.save(__dirname + '/../../corec/vendors/primus.js');
  B('App').primus = primusServer;

}