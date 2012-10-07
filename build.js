var RequireJs = require('requirejs'), 
	build = require('./cores/libs/require_opt').build;

build.out = 'basbosa.client.js';
build.name = 'app';
build.baseUrl = './corec/';
build.optimize = 'none';
RequireJs.optimize(build, function(buildResponse) {
	console.log(build);
	console.log(buildResponse);
});
