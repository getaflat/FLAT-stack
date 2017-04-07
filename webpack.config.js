const resolve = require('path').resolve;
const webpack = require('webpack');

const ROOT = resolve(__dirname, 'src/main/webapp')
const DEST = resolve(__dirname, 'src/main/resources/static')

const SRC = resolve(ROOT, 'src')
const DIST = resolve(DEST, 'dist')

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