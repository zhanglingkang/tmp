var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var port = 4000
config.entry.main.unshift("webpack-dev-server/client?http://localhost:" + port, "webpack/hot/dev-server")
config.plugins.push(new webpack.HotModuleReplacementPlugin())
new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    noInfo: false,
    historyApiFallback: true
}).listen(port, '127.0.0.1', function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log('Listening at localhost:' + port);
    });