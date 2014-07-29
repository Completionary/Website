// TODO: THIS SHOULD BE A MODULE! Currently it is not because of limited
// development time.
var thunkify = require('thunkify');

module.exports = function (apiKey) {
    var paymill = require('paymill-node')(apiKey);

    var categories = {
        clients: ['create','details','update','remove','list'],
        subscriptions: ['create','details','update','remove','list'],
        offers: ['create','details','update','remove','list'],
        payments: ['create','details','remove','list']
    };

    for (var category in categories) {
        categories[category].forEach(function (method) {
            paymill[category][method] = thunkify(paymill[category][method]);
        });
    }

    return paymill;
};
