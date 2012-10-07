
module.exports.JadeCompiler				= require('./jade_compiler');
module.exports.Store							= require('./store');
module.exports.LeveledEvents     	= require('../../corec/libs/leveled_events');
module.exports.Validations 				= require('./validations_module').getInstance();
//module.exports._     							= require(PUBLIC_PATH + '/vendors/underscore-1.3.1');
//module.exports.Backbone						= require(PUBLIC_PATH + '/libs/app_backbone');

//GLOBAL.Logger 										= require(PUBLIC_PATH + '/libs/logging_module');

require('./mongodb_backbone');
