var App = require('./components/App')
var Key = require('./components/Key')
var KeyPrivilege = require('./components/KeyPrivilege')
const routes = {
    path: '/',
    component: App,
    childRoutes: [
        {name: 'key', path: 'key', component: Key},
        {name: 'key备案', path: 'key-privilege', component: KeyPrivilege}
    ]
}
module.exports = routes