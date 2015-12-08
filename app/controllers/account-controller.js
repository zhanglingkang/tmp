var route = require('koa-route')
app.use(route.get('/account/userInfo', function* () {
    var result = {}
    if (this.session.user) {
        result.result = {
            userName: this.session.user.lastName,
            empId: this.session.user.ssoUser.empId
        }
    } else {
        result.status = "error"
    }
    this.body = result
}))
