render = require('../lib/render')

module.exports = display

function *display(){
    this.body = yield render('external_index', {_csrf: this.csrf});
}
