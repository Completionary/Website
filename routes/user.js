var monk = require('monk'),
    wrap = require('co-monk'),
    config = require('../config');
var db = monk(config.mongoUrl);
var users = module.exports.users = wrap(db.get('users'));
// Cross reference so we first need to set the users collection
var paymill = require('../lib/paymill');

var bcrypt = require('co-bcrypt'),
    validator = require('validator'),
    // co = require('co'),
    _ = require('underscore'),
    // passport = require('./auth'),
    endpoint = require('./endpoint'),
    render = require('../lib/render'),
    crypto = require('crypto'),
    thunkify = require('thunkify'),
    nodemailer = require('nodemailer'),
    emailTemplates = require('../emails.js');

var randomBytes = thunkify(crypto.randomBytes);


// CRUD Routes

// Location: POST /user/
// Tries to create a user.
// Expect in Post:
//  name: The users name
//  email: The users email address
//  password: The users password
//  confirm: confirmation of the password
module.exports.create = function *createUserHandler(next) {
    var postedUser = this.request.body;
    var errors = {};

    // Validate input
    if (!postedUser.email || !validator.isEmail(postedUser.email)) {
        errors.email = 'The email address does not seem valid';
    }
    if (!postedUser.name) {
        errors.name = 'You need to enter a name.';
    }
    if (!postedUser.password) {
        errors.password = 'You need to enter a password.';
    }
    if (!postedUser.confirm) {
        errors.password = 'You need to enter your password twice';
    }
    if (postedUser.confirm !== postedUser.password) {
        errors.confirm = 'Passwords don\'t match';
    }

    if (!_.isEmpty(errors)) {
        this.session.errors = errors;
        this.session.data = {
            name: postedUser.name,
            email: postedUser.email
        };
        this.response.redirect('/signup');
        return;
    }

    try {
        var user = yield createUser({
            name: postedUser.name,
            password: postedUser.password,
            provider: 'local',
            email: postedUser.email
        });
        // Login User
        yield this.req.login(user);
    } catch(e) {
        // If only the email is in use, we return to the signup
        if (e.msg === 'email in use' && e.user) {
            this.session.errors = { email: 'Email address is already in use!' };
            this.session.data = {
                name: postedUser.name,
                email: postedUser.email
            };
            this.response.redirect('/signup');
            return;
        } else {
            // Looks like an error in the database...
            // TODO: Show error page

            // Emmit the error so we can handle the logging etc.
            this.app.emit('error', e, this);
        }
    }

    // Redirect to users dashboard
    this.response.redirect('/dashboard');
};

// This is not a route!
// This function creates the user inside the database and also triggers the
// creation of the endpoint. THis function gets called by the /user/ POST
// handler and the github authentication, if it needs to create a user
//
// The handler will throw and error with a message if we cant create the user
function *createUser(data) {
    // Check if email is already in use
    var u = yield users.findOne({email: data.email});
    if (u !== null) {
        // Email address is already in use!
        var e = new Error('email in use');
        e.user = u;
        throw(e);
    }

    // All correct, create user

    // Does the user has a password or is he using github?
    if (data.password && data.provider === 'local') {
        // Salt and hash password
        var salt = yield bcrypt.genSalt(10, 10);
        data.password = yield bcrypt.hash(data.password, salt);
    }

    // Save user in database
    u = yield users.insert(data);

    if (u === null) {
        throw(Error('Could not create the user'));
    }

    // Create the endpoint
    yield endpoint.create(u);

    // Create paymill customer
    yield paymill.create(u);

    return u;
}
module.exports.createUser = createUser;

// Renders the Signup page
// location: GET /signup
module.exports.signup = function *serveSignup() {
    var errors = this.session.errors;
    var data = this.session.data || {};
    this.session.data = null;
    if (errors) {
        this.session.errors = null;
    }
    this.body = yield render('signup.html', this, {errors: errors, data: data});
};

// Renders the Login page
// location: GET /login
module.exports.login = function *serveLogin () {
    var errors = this.session.errors;
    var data = this.session.data || {};
    this.session.data = null;
    if (errors) {
        this.session.errors = null;
    }
    this.body = yield render('login.html', this, {errors: errors, data: data});
};

// Renders the profile page
// location: GET /profile
module.exports.profile = function *serveProfile() {
    this.body = this.req.user;
};

module.exports.forgot = function *forgot() {
  this.body = yield render('forgot.html', this);
};

// Requests a password reset
module.exports.doForgot = function *doForgot() {
  console.log('Hallo');
  // Checks if a user exists
  //
  try {
  var postedUser = this.request.body;
  var u = yield users.findOne({email: postedUser.email});
  if (u) {
    // User exists, request password reset
    // Create token
    var buf = yield randomBytes(25);
    var token = buf.toString('hex');
    // Token is valid for one hour
    u.resetPasswordToken = token;
    u.resetPasswordExpired = Date.now() + 3600000;
    yield users.updateById(u._id, u);

    // Send Email with token
    var smtpTransport = nodemailer.createTransport(config.emailConfig);
    var mail = emailTemplates.forgotPassword(u.email, token, this.req.headers.host);
    var sendMail = thunkify(smtpTransport.sendMail);
    console.log('Sending password forgot mail to', u.email);
    sendMail(mail);
  }
} catch(e) {
  this.app.emit('error', e, this);
}
};
