var render = require('../lib/render'),
    paymill = require('../lib/paymill');

module.exports = function *display () {
    var offers = yield paymill.getOffers();
    this.body = yield render('external_index', this, {offers: offers});
};
