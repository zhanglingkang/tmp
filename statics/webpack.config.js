var path = require("path")
//var webpack = require("webpack")
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin")
module.exports = {
    //entry: "./entry.js",
    //output: {
    //    path: __dirname,
    //    filename: "bundle.js"
    //},
    //entry: {
    //    a: "./a",
    //    b: "./b",
    //    c: ["./c", "./d"]
    //},
    //output: {
    //    path: path.join(__dirname, "dist"),
    //    filename: "[name].entry.js"
    //},
    //module: {
    //    loaders: [
    //        {test: /\.css$/, loader: "style!css"}
    //    ]
    //}


    entry: {
        app: ['./src/app']
        //jquery: ['./node_modules/jquery/dist/jquery.js']
        //bootstrap: ['./node_modules/bootstrap/dist/css/bootstrap.css']
    },
    output: {
        path: path.join(__dirname, "src"),
        //publicPath: "/build/",
        filename: "[name].bundle.js"
        //chunkFilename: "[chunkhash].chunk.js"
    },
    externals: {
        jquery: 'jQuery',
        react: 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        //preLoaders: [{
        //    test: /\.js$/,
        //    exclude: /node_modules/,
        //    loader: 'jsxhint-loader'
        //}],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            //loader: 'react-hot!jsx-loader?harmony'
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015']
            }
        }, {
            test: /\.scss/,
            loader: 'style-loader!css-loader!sass-loader'
        }, {
            test: /\.(css)$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins: []
}