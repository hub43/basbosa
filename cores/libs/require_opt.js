var RequireJs = require('requirejs'), 
	Fs = require('fs'), 
	Crypto = require('crypto'), 
	Path = require('path'),
	build, vendorsPath, nodeModulesPath;

build = typeof Config !== 'undefined' ? Config.requireOpt : {}, 
vendorsPath = Path.dirname(Path.dirname(Path.dirname(__filename))) + '/corec/vendors/';
nodeModulesPath = Path.dirname(Path.dirname(Path.dirname(__filename))) + '/';
build.paths = {
	jquery 			: vendorsPath + 'jquery-1.7.1.min',
	socketio 		: vendorsPath + 'socket.io-0.9.10',
	underscore	: vendorsPath + 'underscore-1.3.1',
	backbone 		: vendorsPath + 'backbone-0.9.2',
	jplayer 		: vendorsPath + 'jquery.jplayer.min',
	basbosa			: vendorsPath + '../libs/basbosa',
	'basbosa-config' 		: nodeModulesPath + 'node_modules/basbosa-config/index',
	'basbosa-logger' 		: nodeModulesPath + 'node_modules/basbosa-logger/index',
	'basbosa-registry' 		: nodeModulesPath + 'node_modules/basbosa-registry/index',
};
build.shim =  {
		'basbosa-config' : ['basbosa-registry'],
		'basbosa-logger' : ['basbosa-registry']
};

// Export it for other modules if needed
module.exports.build = build;
function buildCb(buildResponse, buildConfig) {
	var contents = Fs.readFileSync(buildConfig.out, 'utf8');
	var md5sum = Crypto.createHash('md5');

	md5sum.update(contents);
	buildConfig.digest = md5sum.digest('hex');

	Basbosa('Logger').debug('Current client build: ' + buildConfig.digest + ' for app');

	buildConfig.outBuild = buildConfig.out + '-' + buildConfig.digest + '.js';
	Fs.writeFile(buildConfig.outBuild, contents);
	// clean old files
	var currentBuild = _.extend({}, buildConfig);
	Fs.readdir(Path.dirname(currentBuild.outBuild), function(err, files) {
		files.forEach(function(file) {
			// Delete all old build files
			file = Path.dirname(currentBuild.outBuild) + '/' + file;
			if (file.indexOf(currentBuild.out) > -1	&& file.indexOf(currentBuild.digest) == -1) {
				Basbosa('Logger').debug('Deleting ' + file);
				Fs.unlink(file);
			}
		});
	});
	Config.build = Config.build || {}; 
	Config.build[buildConfig.currentTheme] = buildConfig.digest;
	Basbosa('Logger').info(Config.build);
}
/**
 * Only build the minified version of the client if -m option is set
 */
if (typeof Config != 'undefined' && Config.min) {
	//Build for current app
	var base = build.out, appSettings = build.apps[Config.app], appName = Config.app;
	// Build for each theme
	_.each(appSettings.themes, function(themeName) {
		Basbosa('Logger').debug('Building for app :' + appName + ' theme: ' + themeName);
		build.currentTheme = themeName;
		build.currentApp = appName;
		
		// include the theme (ui.js) file and corec
		build.include = [
		     'appc/themes/' + themeName + '/ui'
		  , 'node_modules/basbosa/corec/app.js'
		];
		build.out = base + '-' + themeName;
		RequireJs.optimize(build, function(buildResponse) {
			buildCb(buildResponse, build);
		});
	});
}
