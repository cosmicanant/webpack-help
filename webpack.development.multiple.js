const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanupWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distPath = path.resolve(__dirname, './public/');
module.exports = {
    entry: { // for multi page application, make multiple entries
        index: './src/index.js',
        about: './src/about.js'
    },
    output: {
        filename: '[name].bundle.js', // name will be parsed as the entry name eg: index|about
        path: distPath, //
        publicPath: '' // base url, will be appended to all static asset name. Please reverify this
    },
    mode: 'development', // can be production/test
    optimization: {
        splitChunks: { // separate commonly used code in chunks, eg: common.css, common.js etc
            chunks: 'all',
            minSize: 10000,
            automaticNameDelimiter: '-'
        }
    },
    devServer: { // see package.json for how to start dev server
        contentBase: distPath,
        index: 'index.html',
        port: 4000
    },
    module: { // how to import
        rules: [
            {
                test: /\.(jpg|png)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(css)$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.(scss)$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // preset is set of plugin to support latest ecma feature as well as experimental features
                        // many presets are available like es2015 , stage-0, stage-2 etc
                        presets: ['@babel/env'], 
                        plugins: ['transform-class-properties'] // 
                    }
                }
            },
            {
                test: /\.(hbs)$/,
                use: ['handlebars-loader']
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].styles.css'
        }),
        new CleanupWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Index page',
            filename: 'index.html',
            chunks: ['index', 'vendors-about-index'],
            template: './src/index.hbs',
            meta: {
                viewport: 'width=device-width, initial-scale=1', 
            },
            description: 'Sample webpack page'
        }),
        new HtmlWebpackPlugin({
            title: 'About page',
            filename: 'about.html',
            chunks: ['about', 'vendors-about-index'],
            template: './src/index.hbs',
            meta: {
                viewport: 'width=device-width, initial-scale=1', 
            },
            description: 'Sample webpack page'
        }),
    ]
};

