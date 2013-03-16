/**
 * Parse command line arguments
 */
var _ = require('underscore');

module.exports = function(Config) {
	var program = require('commander');
  program.version('0.0.2');


  // Populate defaults value for help
  _.forEach(Config.get('commander'), function(params, name) {
    params[1] += ', default: ' + Config.get(name);
    program.option.apply(program, params);
  });

	// Parse command lines
	program.parse(process.argv);

  _.forEach(Config.get('commander'), function(params, name) {
    if (program[name] !== undefined) Config.set(name, program[name]);
  });
	
};
