var log4js = require('log4js')
var path = require('path')
var fs = require('fs')
var util = require('./util')
var logDirPath = path.join(__dirname, '../../logs')
if (fs.existsSync('/home/admin')) {
    logDirPath = '/home/admin/amap-web-boss/logs'
}
util.mkdirSync(logDirPath)
log4js.configure({
    appenders: [
        {
            type: 'dateFile',
            filename: logDirPath + '/access',
            alwaysIncludePattern: true,
            category: 'access',
            pattern: "-yyyyMMdd.log"
        },
        {
            type: 'dateFile',
            filename: logDirPath + '/error',
            alwaysIncludePattern: true,
            category: 'error',
            pattern: "-yyyyMMdd.log"
        }
    ]
})
var errorLogger = log4js.getLogger('error')
errorLogger.setLevel('ERROR')
var accessLogger = log4js.getLogger('access')
accessLogger.setLevel('INFO')
module.exports = {
    errorLogger,
    accessLogger
}
