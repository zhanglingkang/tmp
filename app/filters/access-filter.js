var {accessLogger:logger} = require('../utils/log')
app.use(function*(next) {
    var userName = 'guest'
    var user = this.session.user
    if (user && user.lastName) {
        userName = user.lastName
    }
    logger.info(userName + '-' + this.originalUrl)
    yield next
})