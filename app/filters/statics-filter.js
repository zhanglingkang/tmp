var staticServer = require('koa-static')
var path = require('path')
var route = require('koa-route')
app.use(route.get('/app.html', function*(next) {
    this.body = 'url不正确'
}))
app.use(route.get(/^\/?$/, function*(next) {
    if (this.session.user) {
        this.url = '/app.html'
    }
    yield next
}))
app.use(staticServer(path.join(path.dirname(require.main.filename), '../statics/dist')))
