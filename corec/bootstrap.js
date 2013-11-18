require.config({
  paths : {
    backbone : '/node_modules/basbosa/node_modules/backbone/backbone',
    underscore : '/node_modules/basbosa/node_modules/underscore/underscore',
    jquery : '/node_modules/basbosa/corec/vendors/jquery-2.0.3.min',
    basbosa : '/node_modules/basbosa/node_modules/basbosa-registry/index'
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
  '/node_modules/basbosa/node_modules/basbosa-logger/index.js',
  'backbone',
  'underscore',
  'require'
], function(B, Logger, Backbone, _, require) {
  if (!B.exists('Logger')) B.add('Logger', Logger);
  B.add('Backbone', Backbone);
  B.add('_', _);

  var appPath = $('[data-basbosa-app]').data('basbosa-app');
  require([appPath]);

  return B;
});
