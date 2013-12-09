require.config({
  paths : {
    backbone : '../node_modules/basbosa-mongo/node_modules/backbone/backbone',
    underscore : '../node_modules/underscore/underscore',
    jquery : './vendors/jquery-2.0.3.min',
    basbosa : '../node_modules/basbosa-registry/index',
    primus : './vendors/primus'
  },
  shim: {
    underscore : {
      exports : '_'
    },
    backbone: {
      'deps': ['underscore', 'jquery'],
      'exports': 'Backbone'  //attaches 'Backbone' to the window object
    },
    jquery : {
      exports : '$'
    },
    'CodeMirrorJs' : {
      deps : ['CodeMirror']
    }
  }
});

define([
  'basbosa',
  '../node_modules/basbosa-logger/index',
  'backbone',
  'underscore',
  'require',
  'primus'

], function(B, Logger, Backbone, _, require, Primus) {
  if (!B.added('Logger')) B.add('Logger', Logger);
  B.add('Backbone', Backbone);
  B.add('_', _);
  B.add('Primus', Primus);

  var appPath = $('[data-basbosa-app]').data('basbosa-app');
/*
  var primus = Primus.connect('/');
  B.add('primus', primus);

  primus.on('error', function error(err) {
    console.error('Something horrible has happened', err, err.message);
  });
  primus.on('open', function open() {
    console.log('Connection is alive and kicking');
  });
  primus.on('data', function message(data) {
    console.log('Received a new message from the server', data);
  });
*/
  require([appPath]);

  return B;
});
