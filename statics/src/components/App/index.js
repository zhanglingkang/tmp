require('./style.scss')
var React = require('react')
var App = React.createClass({
    getInitialState() {
        return {}
    },
    componentDidMount() {
    },

    render() {
        return (
            <div className="app-container">
                <header >
                    <a href="/" className="logo">
                        <span>BOSS</span>
                    </a>

                    <div id="auth">
                        <span className="username" name="张凌康">lingkang.zlk</span>
                        <span className="logout"><a href="/logout">退出</a></span>
                    </div>
                </header>
                <section>
                    <nav>
                        <ul className="list-group">
                            <li className="list-group-item active">
                                <a href="#/key">key备案</a>
                            </li>
                            <li className="list-group-item">
                                <a href="#/key-privilege">key权限</a>
                            </li>
                        </ul>
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