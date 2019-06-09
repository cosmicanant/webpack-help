const path = require('path');
// what is webpack: static module bundler, 
// better than grunt gulp as it auto detect all the dependency graph

// let's use some plugins for webpack to do more task 
// extract css from html templates 
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// clean dist directory before build
const CleanupWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// create index.html and auto inject js files and css files into html

const distPath = path.resolve(__dirname, './public/');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: distPath,
        publicPath: ''
    },
    mode: 'development',
    devServer: {
        contentBase: distPath,
        index: 'index.html',
        port: 4000
    },
    module: { 
        // in this section we configure webpack for how to import different file types
        rules: [
            {
                test: /\.(jpg|png)$/i, // for importing these files, use following loader
                use: ['file-loader']
            },
            {
                test: /\.(css)$/i,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(scss)$/i,
                // loader works in reverse order, so sass-loader will be the first loader to be applied
                use: ['style-loader','css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // preset is set of plugin to support latest ecma feature as well as experimental features
                        // many presets are available like es2015 , stage-0, stage-2 etc
                        presets: ['@babel/env'], // which set of ES6 feature needs to support
                        plugins: ['transform-class-properties'] // add some addition feature to support, eg:es6 class properties
                    }
                }
            },
            {
                test: /\.(hbs)$/,
                use: ['handlebars-loader']
            },
        ]
    },
    plugins: [// global plugins to register here
        new CleanupWebpackPlugin(), 
        new HtmlWebpackPlugin({
            title: 'Hello world', // page title
            filename: 'index.html', // output file name
            template: './src/index.hbs', // any template
            meta: {
                viewport: 'width=device-width, initial-scale=1', 
            },
            description: 'Sample webpack page'// other options
        }),
    ]
};

