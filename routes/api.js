var monk = require('monk'),
    wrap = require('co-monk'),
    config = require('../config'),
    render = require('../lib/render'),
    _ = require('underscore');

var db = monk(config.mongoUrl);
var endpoints = wrap(db.get('endpoints'));

// Renders the api documentation page.
// location: GET /api
module.exports.doGet = function *apiDocumentation(next) {
    var errors = this.session.errors;
    var data = this.session.data || {};
    this.session.data = null;
    if (errors) {
        this.session.errors = null;
    }
    this.body = yield render('testAPI.html', this, {errors: errors, data: data});
};


// Location: POST /api
// Tries to create a user.
// Expect in Post:
//  token: The backend token of the user
module.exports.doPost = function *createUserHandler(next) {
    var body = this.request.body;
    var errors = {};

    // Validate input
    if (!body.token) {
        errors.tokenMissing = 'You need to enter your API token. You can obtain the token by logging in to your dashboard.';
    }
    else {
        var user = yield endpoints.findOne({apiKey: body.token });
        if (user === null) {
            errors.tokenUnknown = 'The API token you have entered is unknown to us. Double check that you correctly copyed the key from your dashboard from where you can obtain the key by logging in.';            
        }
    }

    if (!_.isEmpty(errors)) {
        this.session.errors = errors;
        console.log(errors);
        this.response.redirect('/api');
        return;
    }
    else {
        console.log ("found apikey: " + user.apiKey + "  user id: " + user.user_id);
        console.log(body.token + "received api call");
        this.response.redirect('/api');
    }
};