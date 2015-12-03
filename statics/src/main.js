var ReactDom = require('react-dom')
var $ = require('jquery')
var {Router,Route,Link} = require('react-router')
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
ReactDOM.render(<Router routes={routes}/>, document.body)