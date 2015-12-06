var staticServer = require('koa-static')
var path = require('path')
var route = require('koa-route')
app.use(route.get(/^\/?$/, function*(next) {
    this.url = '/index.html'
    yield next
}))
app.use(staticServer(path.join(path.dirname(require.main.filename), '../statics/dist')))
