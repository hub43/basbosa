var Group 	= require('../models/index').ClientModels.Group
	, Sector	= require('../models/index').ClientModels.Sector
	, J				= require('../models/index').ClientModels.J
	, UserAgent = require('useragent')
	, User = require('../models/user'); 
// Load useragent db
UserAgent(true);
var user = new User;
// Populate client assets
var clientAssets = null, 
	mobileOs = ['iOS', 'Windows Mobile', 'Chrome OS', 'Android', 'BlackBerry'],
	desktopOs = ['Windows', 'Linux', 'Mac'];
function populateClientAssets(j) {
	if (clientAssets) j.clientAssets = clientAssets;
	clientAssets = {};
	var clientDir = APP_PATH + '/' + j.themeBase + '/img';
	// Scan default img directory
	clientAssets.img = [];
	require('fs').readdirSync(clientDir).forEach(function(file) {
		clientAssets.img.push(require('path').basename(file));
	});
	// Only for dots, scan img_png24
	if (Config.app == 'apps') {
		clientAssets.img_png24 = [];
		clientDir = APP_PATH + '/' + j.themeBase + '/img_png24';
		// Scan default img directory
		clientAssets.img_png24 = [];
		require('fs').readdirSync(clientDir).forEach(function(file) {
			clientAssets.img_png24.push(require('path').basename(file));
		});
	}
	j.clientAssets = clientAssets;
}

exports.index = function(req, res, next) {
	// Check if user should be redirected
	if (req.session && req.session.redirect) {
		var r = req.session.redirect;
		req.session.redirect = false;
		res.redirect(r);
		return;
	}
	

	var group = J.group.toJSON();
	// Hawk to remove reference to group from sectors 
	_.each(group.sectors, function(sector) {
		sector.group = null;
	});

	var j = {
			coreBase	: PUBLIC_DIR ,
			agent			: JSON.parse(UserAgent.parse(req.headers['user-agent']).toJSON()),
			group 		: group,
			bodyClasses : 'png',
			cui 			: { type: 'html', enableJsPan: true},
			user 			: {
				//group_id 	: group._id,
				group_id : Config.defaultGroup
			}
		};

	Logger.debug('Connected user agent', j.agent);
	// Check if desktop users are not accessing it from Facebook
	var isMobile = false, isDesktop = false;
	
	_.each(mobileOs, function (os) {
		isMobile = isMobile || j.agent.os.indexOf(os) > -1;
	});
	
	_.each(desktopOs, function (os) {
		isDesktop = isDesktop || j.agent.os.indexOf(os) > -1;
	});
	
	// Force png for now
	if (isMobile) {
		j.bodyClasses += ' mobile';
	}
	if (isDesktop) {
		j.bodyClasses += ' desktop';
	}
	 
	// If we are live, and not on mobile and not on facebook, redirect to facebook
	if (!isMobile && req.headers.host.indexOf('hawks.hub43.com') > -1 && !req.body.signed_request) {
		res.redirect('//apps.facebook.com/112420018771592');
		next();
		return;
	}
	
	// Load defaults for group
	_.extend(j.user, group.defaults);

	// Override defaults using user session
	if (Config.skipDb) {
		if (req.user && req.user._id) {
			_.extend(j.user, req.user.toJSON());
		}
	} else {
		if (req.user && req.user._id) {
			_.extend(j.user, req.user);
			j.user.sockets = null;
			user.visitsUpdate(req.user._id, JSON.parse(UserAgent.parse(req.headers['user-agent']).toJSON()));
		}			
	}

	// Temp
	//j.user.theme 	= 'test';
	j.user.app		= 'app';

	// Override any defaults using query parameters
	_.extend(j.user, req.query);
	
	// populate client config
	_.each(Config.clientConfig, function(configName) {
		j[configName] = Config[configName];
	});
	
	res.viewVars.j = j;
	j.themeBase 		= 'appc/themes/' + j.user.theme; 
	res.view 				= j.themeBase + '/views/index';
	
	populateClientAssets(j);
	// Hack, if user in menfe
	if(j.user.app != 'chat') {
		Sector.prototype.getSectorForUser(j.user._id, function(sectorId) {
			j.user.sectorId = sectorId;
			next();
		});
	} else {
		next();
	}
};