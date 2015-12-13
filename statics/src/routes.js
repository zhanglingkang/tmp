var App = require('./components/App')
var Key = require('./components/Key')
var KeyPrivilege = require('./components/KeyPrivilege')
const routes = {
    path: '/',
    component: App,
    childRoutes: [
        {name: 'key备案信息', path: 'key', component: Key},
        {name: 'key封停信息', path: 'key-privilege', component: KeyPrivilege}
    ],
    onEnter: function (obj) {
        if (obj.location.pathname === '/') {
            window.location.hash = '#/key'
        }
    }
}
module.exports = routes