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
        main: ["./main"]
    },
    output: {
        path: path.join(__dirname, "assets"),
        publicPath: "/assets/",
        filename: "[name].bundle.js"
        //chunkFilename: "[id].chunk.js"
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
            //loader:'babel-loader'
        }, {
            test: /\.less/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(css)$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    plugins: []
};