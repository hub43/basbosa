var passport 			= require('passport')
  , util 					= require('util')
  , LocalStrategy = require('passport-local').Strategy
  , User 					= require('../../models').User
  , j 				= require('../../models').ClientModels.J
  , User			=	require('../../models').User
	, crypto 		= require('crypto');


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
	done(null, user._id);
});

passport.deserializeUser(function(id, done) {
	var user = new User(); 
	user.findById(id, {pointsLog : 0, visits : 0, friends : 0}, function(err, user) {
		done(err, user);
  });
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
  function(username, password, done) {
		// ygaras: We want to auto log users by sending hash of passwords from other site, so password
		// will be sent as a hash
		var hashed_pass = password;
    // asynchronous verification, for effect...
    process.nextTick(function () {
			User.auth({username:username, password:hashed_pass}, function(err, user) {
				return done(err, user);

			});
    });
  }
));




_.each(Basbosa('Config').get('auth'), function(data, provider) {
	var strategy = require('passport-' + provider).Strategy;
	if (provider == 'dummy') {
		passport.use(new strategy(function(done) {
		    var user = new User();
		    user.getDummy(function(err, user){
		    	done(null, user);
		    }); 	
		  }
		));
		return;
	}
	data.callbackURL = '/auth/' + provider + '/callback';
	
	passport.use(new strategy(data, function(accessToken, refreshToken, profile, done) {
		var user = new User();
		user.authFbUser(profile, accessToken, function (err, user) {
			if (err) { return done(err); }
			done(null, user);
	  });

	}));
});



exports.passport = passport;