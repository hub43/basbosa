/**
 * Parse command line arguments
 */
var _ = require('underscore');
    _str = require('underscore.string')

_.mixin(_str.exports());

module.exports = function(Config) {
	var program = require('commander'), paramFullNames = [];
  program.version('0.0.2');


  // Populate defaults value for help
  _.forEach(Config.get('commander'), function(params, name) {
    params[1] += ', default: ' + Config.get(name);

    paramFullNames.push({
      paramName : _(params[0].match(/--([a-zA-Z0-9\-\.]+)/)[1]).camelize(),
      configName : name
    });
    program.option.apply(program, params);
  });

	// Parse command lines
	program.parse(process.argv);
  _.forEach(paramFullNames, function(p) {
    if (program[p.paramName] !== undefined) Config.set(p.configName, program[p.paramName]);
  });
	
};
