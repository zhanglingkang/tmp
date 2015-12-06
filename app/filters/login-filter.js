var session = require('koa-session')
var buc = require('koa-buc')
var config = require('../config')
var request = require('superagent')
var _ = require('underscore')
var querystring = require('querystring')
app.keys = ['a', 'b']
app.use(session(app))
app.use(buc({
    appname: 'ant-qmx',
    //clientType: 'e57778cb-2e9a-49bd-8876-3ba18521307a',
    ssoURL: config.bucLoginUrl
}))