var App = require('./components/App')
var Key = require('./components/Key')
var KeyPrivilege = require('./components/KeyPrivilege')
const routes = {
    path: '/',
    component: App,
    childRoutes: [
        {path: 'key', component: Key},
        {path: 'key-privilege', component: KeyPrivilege}
    ]
}
module.exports = routes