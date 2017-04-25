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
    },
    devServer: {
        port: 9090,
        proxy: {
            '/': {
                target: 'http://localhost:8080',
                secure: false,
                prependPath: false
            }
        },
        publicPath: 'http://localhost:9090/dist/'
    }
};