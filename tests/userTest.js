var co = require('co'),
    users = require('../routes/user').users;

var app = require('../app');
var request = require('supertest').agent(app.listen());

describe('User API', function () {

    var testUser = { name: 'foo' };

    var removeAll = function (done) {
        co(function *() {
            yield uesers.remove({});
        })(done);
    };

    beforeEach(function (done) {
        removeAll(done);
    });

    afterEach(function (done) {
        removeAll(done);
    });

    it('creates a new user', function (done) {
        request
            .post('/user')
            .send(testUser)
            .expect('location', /^\/user\/[0-9a-fA-F]{24}$/)
            .expect(200, done);
    });

    it('get existing user', function (done) {
        co(function *() {
            var user = yield users.insert(testUser);
            var userUrl = '/user/' + user._Id;

            // Get
            request
                .get(userUrl)
                .expect(200, done);
        });
    });
})
