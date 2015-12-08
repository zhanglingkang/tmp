require('./style.scss')
var React = require('react')
var routes = require('../../routes')
var logo = require('./logo.png')
var App = React.createClass({
    getInitialState() {
        return {}
    },
    componentDidMount() {
        $.getJSON('/account/userInfo').then((data) => {
            this.setState({userName: data.result.userName})
        })
    },

    render() {
        var menu = this.props.route.childRoutes.map((childRoute, index)=> {
            var active = ''
            if (this.props.location.pathname.split('/').indexOf(childRoute.path) !== -1) {
                active = 'active'
            }
            return (
                <a key={index} href={"#/"+childRoute.path} className={`list-group-item ${active}`}>
                    {childRoute.name}
                </a>
            )
        })
        return (

            <div id="app-container" className="flex flex-column" style={{height:'100vh'}}>
                <header className="flex justify-content-between align-items-center">
                    <a href="/" className="logo">
                        <img src={logo}></img>
                    </a>

                    <div>
                        <span style={{marginRight:"10px"}}>{this.state.userName}</span>
                        <span><a href="/logout">退出</a></span>
                    </div>
                </header>
                <section className="flex flex-1">
                    <nav id="menu-nav" className="flex">
                        <div className="list-group flex-1">
                            {menu}
                        </div>
                    </nav>
                    <div className="content flex-1">
                        {this.props.children}
                    </div>
                </section>
            </div>
        )
    }
})
module.exports = App