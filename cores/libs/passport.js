var B = require('basbosa'),
  passport = require('passport');



module.exports = function(B) {

  var app = B('App');
  B('Logger').trace('Loading passport...');
  passport.serializeUser(B('Config').get('passport.serializeUser') || function(user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(B('Config').get('passport.deserializeUser') || function(id, done) {
    B('AutoModels').getModel('User', function(err, User) {
      B('Logger').trace('searching to deserializeUser user with id ' + id);
      User.find({_id : (new B('ObjectId'))(id)}, function(err, users) {
        if (err) {
          B('Logger').warn(err);
          throw err;
        }
        //B('Logger').trace('Found user with id ' , users.first());
        done(err, users.first());
      });
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());

  B('_').each(B('Config').get('passport.auth'), function(data, provider) {
    var strategy = require('passport-' + provider).Strategy;

    var data = B('_').extend({}, {
      authUrl : '/auth/' + provider,
      callbackURL : '/auth/' + provider + '/callback',

      createOrSaveUser :B('Config').get('passport.createOrSaveUser') || function(accessToken, refreshToken, profile, done) {
        B('AutoModels').getModel('User', function(err, User) {
          B('Logger').trace('trying to find a user with id' , profile.id);
          B('Logger').trace('trying to find a user with profile' , profile);
          User.find({username : profile.username, provider : profile.provider}, function(err, users) {
            if (err) {
              B('Logger').warn(err);
              throw err;
            }
            if (users.first()) {
              return done(err, users.first());
            } else {
              var user = new (User);
              user.set(profile);
              user.saveDb(function(err) {
                done(err, user);
              });
            }
          });
        });
      }
    }, data);

    function passportCb(provider) {
      return passport.authenticate(provider, {
        successRedirect: B('Config').get('passport.successRedirect'),
        failureRedirect: B('Config').get('passport.failureRedirect')
      });
    }


    passport.use(new strategy(data, data.createOrSaveUser));

    //app.get('/auth/' + provider, Http.AuthController.storeUrl);
    app.get(data.authUrl, passport.authenticate(provider));
    // redirect if things are ok
    app.get(data.authUrl, function(req, res) { res.redirect('/'); } );
    app.get(data.callbackURL, passportCb(provider));
  });
};

