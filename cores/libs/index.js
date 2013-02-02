
module.exports.JadeCompiler				= require('./jade_compiler');
module.exports.Store							= require('./store');
module.exports.LeveledEvents     	= require('../../corec/libs/leveled_events');
module.exports.Validations 				= require('./validations_module').getInstance();


require('./mongodb_backbone');
