var monk = require('monk'),
    wrap = require('co-monk'),
    config = require('../config'),
    render = require('../lib/render'),
    endpoints = require('./endpoint.js').endpoints;

// GET
// Shows the dashboard
// We search for the dashboard
module.exports.get = function *dashboard () {
    // Get all endpoints for the logged in user
    var endpoint = yield endpoints.findOne({user_id: this.req.user._id});
    this.body = yield render('dashboard', this, {endpoint: endpoint, endpointID: 'wikipediaindex'});
};

// GET
// Shows the analytics for the specific endpoint
module.exports.getAnalytics = function *getAnalytics() {
  var endpoint = yield endpoints.findOne({user_id: this.req.user._id});
  this.body = yield render('analytics', this, {endpoint: endpoint, endpointID: 'wikipediaindex'});
};

// GET
// Shows the settings for the specific endpoint
// The settings changes will be processed inside the put for endpoint or user
module.exports.getSettings = function *getSettings() {
  var endpoint = yield endpoints.findOne({user_id: this.req.user._id});
  this.body = yield render('settings', this, {endpoint: endpoint, endpointID: 'wikipediaindex'});
};

// GET
// Shows the documentaion for the specific endpoint
// Only specific item is the api key already inserted inside the JS
module.exports.getDocumentation = function *getDocumentation() {
  var endpoint = yield endpoints.findOne({user_id: this.req.user._id});
  this.body = yield render('documentation', this, {endpoint: endpoint, endpointID: 'wikipediaindex'});
};

// GET
// Shows the index operations for the specific endpoint
// Only specific item is the api key already inserted inside the JS
module.exports.getIndexOps = function *getIndexOps() {
  var endpoint = yield endpoints.findOne({user_id: this.req.user._id});
  this.body = yield render('indexOps', this, {endpoint: endpoint, endpointID: 'wikipediaindex'});
};
