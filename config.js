// HTTP Port
exports.httpPort = 3000;


// Load environment specific settings
var env = process.env.NODE_ENV;
var admin;
if (env === 'production') {
    admin = require('./config.admin.js');
} else try {
    if (env === 'development') {
        admin = require('./config.dev.js');
    } else if (env === 'test') {
        admin = require('./config.test.js');
    } else {
        admin = require('./config.admin.js');
    }
} catch (er) {
    console.error('Warning: No admin configuration. Not suitable for production use.', er);
    admin = {};
}

// Copy values
Object.keys(admin).forEach(function (k) {
    exports[k] = admin[k];
});
