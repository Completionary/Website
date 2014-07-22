var monk = require('monk'),
    wrap = require('co-monk'),
    config = require('../config'),
    _ = require('underscore'),
    render = require('../lib/render');

var db = monk(config.mongoUrl);
var endpoints = module.exports.users = wrap(db.get('endpoints'));

// This is not a post request anymore!
// We call this from the user creation since every user only has endpoint.
//
// First we request an API key from the internal API (Currently we only
// generate a fake random sha1 hash as a placeholder) After we got a key we
// create the endpoint inside the database.
// Params:
//  user: The user object. Is has to be a database object since we need the ID.
module.exports.create = function *createEndpoint (user) {
    // TODO: GET API KEY
    var apiKey = getAPIKey(user);

    var e = yield endpoints.insert({
        apiKey: apiKey,
        user_id: user._id,
        paid: false
    });
};

function getAPIKey (user) {
    var current_date = (new Date()).valueOf().toString();
    return crypto.createHash('sha1').update(current_date + user.name).digest('hex');
}

module.exports.list = function *listDashboard (next) {
    // Get all endpoints for the logged in user
    var epts = yield endpoints.find({user_id: this.req.user._id});
    this.body = yield render('dashboard', {_csrf: this.csrf, endpoints: epts});
};

module.exports.get = function *getEndpoint (next) {
    var e = yield endpoints.findById(this.params.id);
    if (!(e && this.req.user._id.equals(e.user_id))) {
        this.redirect('/dashboard');
        return;
    }
    var epts = yield endpoints.find({user_id: this.req.user._id});
    this.body = yield render('endpoint', {_csrf: this.csrf, endpoints: epts, e: e});
};
