const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanupWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, './public/'),
        publicPath: ''
    },
    mode: 'production',
    module: { // how to import
        rules: [
            {
                test: /\.(jpg|png)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(css)$/i,
                // use: ['style-loader','css-loader']
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(scss)$/i,
                use: ['style-loader','css-loader', 'sass-loader']
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
            filename: 'styles.[contenthash].css'
        }),
        new CleanupWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Hello world',
            filename: 'index.html',
            template: './src/index.hbs',
            meta: {
                viewport: 'width=device-width, initial-scale=1', 
            },
            description: 'Sample webpack page'
        }),
    ]
};

