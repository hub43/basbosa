/**
 * GroupController is responsible on control the communication between Group Model 
 * in the server side and the client side. 
 * @module Cores
 * @submodule CoresControllers
 * @class GroupController
 **/
//define instance from group, sector, j and  user models, and userAgent.
var Group 	= require('../models/index').ClientModels.Group
	, Sector	= require('../models/index').ClientModels.Sector
	, J				= require('../models/index').ClientModels.J
	, UserAgent = require('useragent')
	, User = require('../models/user'); 

// Load user agent db
UserAgent(true);
var user = new User;
// Populate client assets
var clientAssets = null, 
	mobileOs = ['iOS', 'Windows Mobile', 'Chrome OS', 'Android', 'BlackBerry'],
	desktopOs = ['Windows', 'Linux', 'Mac'];

/**
 * PopulateClientAssets is used to direct the client application 
 * to the paths of the images(.png or .svg) that it will need it in its process. 
 * @method populateClientAssets
 * @param {Object} j is a global object hold instance from active sectors and users.
 */
function populateClientAssets(j) {
	if (clientAssets) j.clientAssets = clientAssets;
	clientAssets = {};
	var clientDir = APP_PATH + '/' + j.themeBase + '/img';
	// Scan default img directory
	clientAssets.img = [];
	require('fs').readdirSync(clientDir).forEach(function(file) {
		clientAssets.img.push(require('path').basename(file));
	});
	// scan img_png24
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

/**
 * Index is used to check if user should be redirected or not 
 * , if not remove the reference to group from sectors and reinitialize with 
 * the new references and check if the user ask to enter the game from what {mobile or desktop} 
 * , if the user entered from desktop and not from facebook redirect it to facebook 
 * , then redirect he/she to the view of the game.
 * @method index
 * @param {String} req hold the request that come from the client. 
 * @param {String} res the response that will hold the message to the client.
 * @param {Fanction} next is used to go next.
 */
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
		j.redirect = '//apps.facebook.com/112420018771592';
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