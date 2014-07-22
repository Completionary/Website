var monk = require('monk'),
    wrap = require('co-monk'),
    config = require('../config'),
    _ = require('underscore'),
    crypto = require('crypto'),
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

    if (e === null) {
        throw(Error('database error!'))
    }

    return e;
};

function getAPIKey (user) {
    var current_date = (new Date()).valueOf().toString();
    return crypto.createHash('sha1').update(current_date + user.name).digest('hex');
}

// GET
// Shows the dashboard
// We search for the dashboard
module.exports.get = function *dashboard (next) {
    // Get all endpoints for the logged in user
    var endpoint = yield endpoints.findOne({user_id: this.req.user._id});
    this.body = yield render('dashboard', {_csrf: this.csrf, endpoint: endpoint});
};
