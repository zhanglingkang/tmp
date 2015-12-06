var _ = require('underscore')
var commonConfig = {
    bucLoginUrl: 'https://login.alibaba-inc.com/',
}
var config = _.extend(commonConfig, require('./config'))
module.exports = config