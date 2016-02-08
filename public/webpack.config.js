var webpack = require('webpack');

module.exports = {
    entry: './js/main.js',
    output: {path: __dirname, filename: 'bundle.js'},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            'Promise': 'promise-polyfill',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};