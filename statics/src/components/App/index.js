require('./style.scss')
var React = require('react')
var routes = require('../../routes')
var App = React.createClass({
    getInitialState() {
        return {}
    },
    componentDidMount() {
    },

    render() {
        var menu = this.props.route.childRoutes.map(function (childRoute, index) {
            var active = index === 0 ? 'active' : ''
            return (
                <a key={index} href={"#/"+childRoute.path} className={`list-group-item ${active}`}>
                    {childRoute.name}
                </a>
            )
        })
        return (

            <div className="app-container flex flex-column">
                <header >
                    <a href="/" className="logo">
                        <span>BOSS</span>
                    </a>

                    <div id="auth">
                        <span className="username" name="张凌康">lingkang.zlk</span>
                        <span className="logout"><a href="/logout">退出</a></span>
                    </div>
                </header>
                <section className="flex">
                    <nav>
                        <div className="list-group">
                            {menu}
                        </div>
                    </nav>
                    <div className="content">
                        {this.props.children}
                    </div>
                </section>
            </div>
        )
    }
})
module.exports = App