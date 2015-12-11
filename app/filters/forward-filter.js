var route = require('koa-route')
var httpProxy = require('http-proxy')
var proxy = httpProxy.createProxyServer({})
var {errorLogger}=require('../utils/log')
var thunkify = require('thunkify')
var proxyWeb = thunkify(proxy.web)
app.use(route.get(/^\/f\//, forward))
app.use(route.post(/^\/f\//, forward))
function*forward() {
    this.url = this.url.replace(/\/f/, '')
    yield proxy::proxyWeb(this.req, this.res, {target: 'http://10.189.196.64/'})//'http://100.69.207.111:18081/amap-api-boss-srv'})
}