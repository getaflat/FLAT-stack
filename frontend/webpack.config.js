const resolve = require('path').resolve;
const webpack = require('webpack');

const SRC = resolve(__dirname, 'src/main/javascript/')
const DIST = resolve(__dirname, 'src/main/resources/static/dist')

module.exports = {
    devtool: 'source-map',
    entry: resolve(SRC, 'index.js'),
    output: {
        path: DIST,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};