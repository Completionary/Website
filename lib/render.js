var views = require('co-views');

var render = views(__dirname + '/../views',  {
    map: { html: 'swig' },
    cache: false
});

module.exports = function *(view, ctx, opts) {
    opts = opts || {};

    opts._csrf = ctx.csrf;
    opts.user = ctx.req.user;

    return yield render(view, opts);
};
