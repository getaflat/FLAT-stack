const resolve = require('path').resolve;
const webpack = require('webpack');

const SRC = resolve(__dirname, 'src/main/javascript/')
const DIST = resolve(__dirname, 'src/main/resources/static/dist/')

module.exports = {
    devtool: 'eval-source-map',
    entry: resolve(SRC, 'index.js'),
    output: {
        path: DIST,
        // publicPath: DIST,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        ['es2015', { modules: false }],
                        'react'
                    ],
                    plugins: [
                        'transform-object-rest-spread'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[name]__[local]___[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
        disableHostCheck: true,
        publicPath: 'http://localhost:9090/dist/',
        historyApiFallback: true
    }
};