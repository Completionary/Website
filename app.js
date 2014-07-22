var koa = require('koa'),
    logger = require('koa-logger'),
    Router = require('koa-router'),
    session = require('koa-generic-session'),
    RedisStore = require('koa-redis'),
    csrf = require('koa-csrf'),
    parse = require('co-body'),
    serve = require('koa-static'),
    passport = require('./routes/auth'),
    config = require('./config');

// Setup Application
var app = module.exports = koa();
app.keys = config.keys;
csrf(app);


// Setup middleware
app.use(logger());
app.use(session({
    store: new RedisStore()
}));

// Parse every post request and save it in ctx.request.body
app.use(function *bodyParser(next){
  if ('POST' !== this.method) return yield next;
  var body = yield parse(this);
  this.request.body = body;
  yield next;
});

app.use(csrf.middleware);
app.use(passport.initialize());
app.use(passport.session());
app.use(serve('static'));
app.use(Router(app));

// Routes
require('./router')(app);

if (!module.parent) {
    app.listen(config.httpPort);
    console.log('Listening on port', config.httpPort);
}
