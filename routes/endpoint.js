var monk = require('monk'),
    wrap = require('co-monk'),
    config = require('../config'),
    _ = require('underscore'),
    crypto = require('crypto'),
    paymill = require('../lib/paymill'),
    render = require('../lib/render'),
    thriftStreaming = require('../lib/Streaming');

var db = monk(config.mongoUrl);
var endpoints = module.exports.endpoints = wrap(db.get('endpoints'));

// This is not a post request anymore!
// We call this from the user creation since every user only has one endpoint.
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
    this.body = yield render('dashboard', this, {endpoint: endpoint, endpointID: 'wikipediaindex'});
};

// GET
// Shows the pricing table
// If the user is logged in, he can upgrade his plan from this screen,
// Else he gets promted to sign up
module.exports.pricing = function *(next) {
    var offers = yield paymill.getOffers();
    // Change the price to full values, not cents
    offers.forEach(function (offer) {
        offer.priceDisplay = (offer.amount / 100).toFixed(2);
    });
    var data = {
        offers: offers,
        user: this.req.user
    };
    this.body = yield render('pricing', this, data);
};

module.exports.payment = function *(next) {
    var offer = yield paymill.getOfferById(this.params.offerId);
    this.body = yield render('payment', this, {offer: offer});
};

module.exports.upgrade = function *(next) {
    var token = this.request.body.paymillToken;
    // Create new payment
    var payment = yield paymill.payments.create({
        token: token,
        client: this.req.user.paymillId
    });

    console.log(payment);
    var sub = yield paymill.subscriptions.create({
        client: this.req.user.paymillId,
        offer: this.request.body.offerId,
        payment: payment.data.id
    });
    // SUBSCRIPTION SUCCESS!
};
