var passport = require('./routes/auth'),
    authed = passport.authed,
    notAuthed = passport.notAuthed,
    user = require('./routes/user'),
    endpoint = require('./routes/endpoint'),
    dashboard = require('./routes/dashboard.js'),
    api = require('./routes/api');

module.exports = function (app) {
    app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
    app.get('/auth/github/callback', passport.authenticate('github', { successReturnToOrRedirect: '/profile', failureRedirect: '/login' }));
    app.post('/auth/local', passport.authenticate('local', { successReturnToOrRedirect: '/profile', failureRedirect: '/login' }));

    app.get('/signup', notAuthed('/dashboard'), user.signup);
    app.get('/login', notAuthed('/dashboard'), user.login);
    app.post('/user', notAuthed('/dashboard'), user.create);

    // Password Forgotten
    app.get('/forgot', notAuthed('/dashboard'), user.forgot);
    app.post('/forgot', notAuthed('/dashboard'), user.doForgot);

    // Secure routes
    app.get('/profile', authed, user.profile);
    app.get('/logout', authed, function* (){
      this.req.logout();
      this.response.redirect('/');
    });

    // Dashboard
    app.get('/dashboard', authed, dashboard.get);
    app.get('/dashboard/analytics', authed, dashboard.getAnalytics);
    app.get('/dashboard/settings', authed, dashboard.getSettings);
    app.get('/dashboard/index', authed, dashboard.getIndexOps);
    app.get('/dashboard/documentation', authed, dashboard.getDocumentation);

    // endpoint
    app.post('/endpoint', authed, endpoint.create);
    app.get('/upgrade', authed, endpoint.pricing);
    app.post('/upgrade', authed, endpoint.upgrade);
    app.get('/upgrade/:offerId', authed, endpoint.payment);


    // api calls
    // app.get('/api', api.doGet);
    // app.post('/api', api.doPost);
 //   app.get('/tapi', require('./lib/thriftApi'));

    // loggedout
    app.get('/', require('./routes/loggedOut'));
    app.get('/pricing', notAuthed('/upgrade'), endpoint.pricing);
};
