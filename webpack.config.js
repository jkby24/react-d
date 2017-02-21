
'use strict';
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");  //css单独打包
var argv = require('minimist')(process.argv.slice(2));
var isProduction = argv.env === 'production';
module.exports = {
    devtool: isProduction ? false : 'eval-source-map',//正式环境不需要source-map

    entry: {
      'vendor' : ['react', 'react-dom'],
      'bundle' : __dirname + '/src/entry.js'
    },
    output: {
        path: __dirname + '/build', //打包后的文件存放的地方
        filename: '[name].js', //打包后输出文件的文件名
        chunkFilename: "[name].js"
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx!babel", include: /src/},
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css!postcss")},
            { test: /\.scss$/, loader: ExtractTextPlugin.extract("style", "css!postcss!sass")},
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
        ]
    },

    postcss: [
        require('autoprefixer')    //调用autoprefixer插件,css3自动补全
    ],

    devServer: {
        // contentBase: './src/views'  //本地服务器所加载的页面所在的目录
        port: 8888,
        colors: true,  //终端中输出结果为彩色
        historyApiFallback: true,  //不跳转
        inline: true  //实时刷新
    },

    plugins: [
        new ExtractTextPlugin('main.css'),
        new webpack.optimize.CommonsChunkPlugin({
      		names: ['vendor']
      	})
    ]

}
