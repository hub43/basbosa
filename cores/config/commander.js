/**
 * Parse command line arguments
 */
var _ = require('underscore');

module.exports = function(Config) {
	var program = require('commander');
	
	// Populate default options
	program
	  .version('0.0.1')
	  .option('-p, --port <n>', 'main app port number, default: ' + Config.port, parseInt)
	  .option('-e, --env <environment>', 'force run environment, default: ' + Config.env)
	  .option('-t, --test', 'run tests on server startup, default: '  + Config.test)
	  .option('-m, --min', 'use minifed client, default: ' + Config.min)
	  .option('-a, --app <app>', 'set default app to load, defaut: ' + Config.app)
	  .option('-l, --logging <level>', 'set logging level, defaut: ' + Config.logging)
	  .option('-s, --skip-opt', 'skip client optimization using uglify, defaut: ' + Config.skipOpt)
		.option('--enableFeedback', 'enableFeedback option, default' + Config.enableFeedback);
	
	// Populate extra options
	/*
	_.each(Config, function(commandLine) {
		program.option(commandLine[0], commandLine[1]);
	});
	*/
	
	// Parse command lines
	program.parse(process.argv);
	
	_.each(['port', 'env', 'test', 'min', 'app', 'logging', 'skipOpt', 'enableFeedback'], function(key) {
		//Basbosa('Logger').debug('key: '+ key + ' value :' + program[key]);
		program[key] !== undefined && (Config[key] = program[key]);
	});
	
};
