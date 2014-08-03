var passport = require('./routes/auth'),
    authed = passport.authed,
    notAuthed = passport.notAuthed,
    user = require('./routes/user'),
    endpoint = require('./routes/endpoint');
    api = require('./routes/api');

module.exports = function (app) {
    app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
    app.get('/auth/github/callback', passport.authenticate('github', { successReturnToOrRedirect: '/profile', failureRedirect: '/login' }));
    app.post('/auth/local', passport.authenticate('local', { successReturnToOrRedirect: '/profile', failureRedirect: '/login' }));

    app.get('/signup', notAuthed('/dashboard'), user.signup);
    app.get('/login', notAuthed('/dashboard'), user.login);
    app.post('/user', notAuthed('/dashboard'), user.create);

    // Secure routes
    app.get('/profile', authed, user.profile);
    app.get('/logout', authed, function* (next){
      this.req.logout();
      this.response.redirect('/');
    });

    // endpoint
    app.get('/dashboard', authed, endpoint.get);
    app.post('/endpoint', authed, endpoint.create);
    app.get('/upgrade', authed, endpoint.pricing);
    app.post('/upgrade', authed, endpoint.upgrade);
    app.get('/upgrade/:offerId', authed, endpoint.payment);


    // api calls
    app.get('/api', api.doGet)
    app.post('/api', api.doPost)

    // loggedout
    app.get('/', require('./routes/loggedOut'));
    app.get('/pricing', notAuthed('/upgrade'), endpoint.pricing)
};
