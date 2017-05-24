const webpack = require('webpack');

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested'),
        require('postcss-import')
    ]
};