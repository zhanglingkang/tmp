var App = React.createClass({
    getInitialState() {
        return {}
    },

    componentDidMount() {
    },

    render() {
        return (
            <header >
                <a href="/" class="logo">
                    <span>BOSS</span>
                </a>
                <div id="auth">
                    <span class="username" name="张凌康">lingkang.zlk</span>
                    <span class="logout"><a href="/logout">退出</a></span>
                </div>
            </header>
        )
    }
})
module.exports = App