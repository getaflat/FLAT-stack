const webpack = require('webpack');

module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested')
    ]
};