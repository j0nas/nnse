const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        'bootstrap-loader',
        path.join(__dirname, 'public', 'index.js')
    ],
    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ],
    module: {
        loaders: [
            {test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery'},
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&minetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: /\.css$/, loader: 'style!css'},
            {test: /^((?!config).)*\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'}
            //{test: /.jsx?$/, loader: 'babel-loader', exclude: /node_modules/}
        ]
    }
};
