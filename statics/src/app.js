var React = require('react')
var ReactDOM = require('react-dom')
var {Router,Route,Link} = require('react-router')
var $ = require('jquery')
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
ReactDOM.render(<Router routes={routes}/>, $('#react-root')[0])