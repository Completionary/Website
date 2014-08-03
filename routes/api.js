var render = require('../lib/render'),
    apiClient = require('../lib/thriftApi');

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

    console.log(body.token + "received POST request now piping forward to the node Thrift server");
    var response = yield apiClient.testClient.addSingleTerm(body.token, "apitestindex", "1", ["hallo", "hallo welt"], "hallo a welt", "testpayload", 8);
    console.log("response from node thrift server: " + response);
    this.response.redirect('/api');
};