// Setup the passport module to handle login with oauth provider
var passport = require('koa-passport'),
    GithubStrategy = require('passport-github').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    co = require('co'),
    bcrypt = require('co-bcrypt'),
    createUser = require('./user').createUser,
    users = require('./user').users,
    config = require('../config'),
    crypto = require('crypto');

// Use passport for OAuth
// GITHUB
passport.use(new GithubStrategy(config.github,
    // Try to find a user in our database that is represented by this github profile.
    function (accessToken, refreshToken, profile, done) {
        co(function *() {
            var u = {
                name: profile.displayName,
                githubID: profile.id,
                email: profile._json.email,
                provider: 'github'
            };

            // Check if github user already created
            var user = yield users.findOne({email: u.email});
            if (user !== null) {
                // Yes, user exists, so we just log in.
                return user;
            }

            // We just try to create a new user.
            // We will get an error if the email address is already in use.
            try {
                var newUser = yield createUser(u);
                return newUser;
            } catch(e) {
                if (e.user && e.msg === 'email in use') {
                    // Good, we already have an user with the same email.
                    // Lets just check, if he has the same githun ID.
                    if (e.user.githubID && e.user.githubID === u.githubID) {
                        // Seems like its the same user, so just log him in.
                        return e.user;
                    } else {
                        // Woot? How does this happen? Someone has the same
                        // email but does not have the same githubID? That does
                        // not seem right.
                        throw(Error('github email mismatch'));
                    }
                } else {
                    // A database error happened....
                    // TODO: Show error page!
                    console.log(e);
                    throw(e);
                }
            }


        })(done);
    }
));

// LocalStrategy
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, done) {
        co(function *() {
            var u = yield users.findOne({email: email});
            if (u !== null && bcrypt.compare(password, u.password)) {
                // User found
                return u;
            } else {
                // No user found or password does not match
                return false;
            }
        })(function (err, res) {
            if (!res) {
                done(null, false, {message: 'Email and password combination does not match'});
            } else {
                done(null, res);
            }
        });
    }
));

passport.serializeUser(function (user, done) {
    if (!user) {
        done('ERROR');
    } else {
        done(null, user._id);
    }
});

passport.deserializeUser(function (id, done) {
    co(function * () {
        return yield users.findById(id);
    })(done);
});

module.exports = passport;

// Helper
module.exports.authed = function *authed(next){
  if (this.req.isAuthenticated()){
    yield next;
  } else {
    //Set redirect path in session
    this.session.returnTo = this.session.returnTo || this.req.url;
    this.redirect('/login');
  }
};

module.exports.notAuthed = function (redirectUrl) {
    return function *(next) {
        if (!this.req.isAuthenticated()) {
            yield next;
        } else {
            this.redirect(redirectUrl);
        }
    };
};
