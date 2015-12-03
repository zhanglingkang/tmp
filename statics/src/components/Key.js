var Key = React.createClass({
    getInitialState() {
        return {}
    },

    componentDidMount() {
    },

    render() {
        return (
            <div>
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
                            <li className="list-group-item active"
                                href="#/role">key备案
                            </li>
                            <li className="list-group-item"
                                href="#/user">key权限
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
module.exports = Key