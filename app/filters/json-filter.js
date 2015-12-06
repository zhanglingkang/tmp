var bodyParser = require('koa-bodyparser')
var _ = require('underscore')
app.use(bodyParser())
app.use(function*(next) {
    yield next
    if (_.isObject(this.body) && this.body.constructor.name !== 'Gzip') {
        this.body = JSON.stringify(this.body)
    }
})