require('./style.scss')
//require('./amaui.css')
var React = require('react')
var ReactDOM = require('react-dom')
var {Router,Route,Link} = require('react-router')
var $ = require('jquery')
var routes = require('./routes')
var createHistory = require('history/lib/createHashHistory')
var history = createHistory({
    queryKey: false
})
ReactDOM.render(<Router routes={routes} history={history}/>, $('#react-root')[0])