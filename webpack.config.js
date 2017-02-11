"use strict";

const webpack = require('webpack'),
    path = require('path');

const config = {
    entry: {
        index: "./src/index",
    },

    output: {
        path: path.join(__dirname, 'public/js'),
        filename: '[name].bundle.js'
    },

    devtool: 'inline-source-map',

    watch:true,

    module: {
        rules: [{
                test: /\.jsx$|\.js$/,
                include: path.resolve(__dirname, "src"),
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime']
                }
            },
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.NoEmitOnErrorsPlugin()
    ]

};

module.exports = config;