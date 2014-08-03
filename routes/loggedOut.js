var render = require('../lib/render'),
    paymill = require('../lib/paymill')
    thriftStreaming = require('../lib/thriftStreaming');

module.exports = function *display () {
    var offers = yield paymill.getOffers();
    this.body = yield render('external_index', this, {offers: offers});
};

module.exports.test = function *test() {
    try {
        yield thriftStreaming.connectForEndpoint('wikipediaindex');
    } catch(e) {
        console.log(e);
    }
}
