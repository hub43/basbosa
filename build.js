var RequireJs = require('requirejs'), 
	build = require('./cores/libs/require_opt').build
	Fs 		= require('fs');

build.out = 'basbosa.client.js';
build.name = 'app';
build.baseUrl = './corec/';
build.optimize = 'none';
build.include = ['./vendors/require-2.0.4'];
build.namespace = 'BasbosaJs';

Fs.readFile('package.json', function(err, data) {
	// Build without require-js, with almond)
	var packaheJson = JSON.parse(data);
	build.out = 'basbosa.client-' + packaheJson.version + '-requirejs.js';
	RequireJs.optimize(build, function(buildResponse) {
		console.log(build);
		console.log(buildResponse);
	});
	
	// Build without require-js 
	build.name = './../almond';
	build.include = ['app'];
	build.out = 'basbosa.client-' + packaheJson.version + '.js';
	
	RequireJs.optimize(build, function(buildResponse) {
		console.log(build);
		console.log(buildResponse);
	});
	
});

