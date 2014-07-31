var config = require('../config.js'),
    users = require('../routes/user').users,
    paymill = require('co-paymill')(config.paymillKey);


module.exports = paymill;

// Handled the paymill customer creation.
module.exports.create = function *paymillCustomer (user) {
    // Create Paymill client
    var client = yield paymill.clients.create({
        email: user.email,
        description: user.name
    });

    // Update User in database to add paymill id
    user.paymillId = client.data.id;
    users.updateById(user._id, user);
};

// Get all paymill offers to display them
module.exports.getOffers = function *paymillGetOffers () {
    var offers = yield paymill.offers.list({});
    return offers.data;
};

module.exports.getOfferById = function *paymilGetOfferById (id) {
    var offer = yield paymill.offers.details(id);
    return offer.data;
};
