var RequireJs = require('requirejs'), 
	build = require('./cores/libs/require_opt').build, 
	Fs 		= require('fs');

build.out = 'basbosa.client.js';
build.baseUrl = './corec/';
build.optimize = 'none';
build.paths.requireLib = 'vendors/require-2.0.4';

Fs.readFile('package.json', function(err, data) {
	// Build with require-js
	var packageJson = JSON.parse(data);
	build.name = 'app';
	build.include = 'requireLib';
	build.out = 'basbosa.client-' + packageJson.version + '-requirejs.js';
	RequireJs.optimize(build, function(buildResponse) {
		console.log(build);
		console.log(buildResponse);
		Fs.createReadStream(build.out).pipe(Fs.createWriteStream('basbosa-require.js'));
	});
		
	// Build with almond 
	build.name = './../almond';
	build.include = ['app'];
	build.out = 'basbosa.client-' + packageJson.version + '.js';
	build.wrap = {
		start : '//',
		end : 'require(\'app\');'
	};
	
	RequireJs.optimize(build, function(buildResponse) {
		console.log(build);
		console.log(buildResponse);
		Fs.createReadStream(build.out).pipe(Fs.createWriteStream('basbosa.js'));
	});
});

