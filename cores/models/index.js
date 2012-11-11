/**
 * Index Model it is just a class help to load anther files like user and sector 
 * @module Cores
 * @submodule CoresModels
 * @class Index
 **/
	module.exports.User		      = require('./user');
	module.exports.Sector		    = require('./sector');
	module.exports.ClientModels = AppDirLoad(APP_PATH +'/node_modules/basbosa/corec/models');