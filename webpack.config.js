const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, 'public', 'index.js')
    ],
    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory'}
        ]
    },
    debug: true,
    devtool: "cheap-eval-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
        new webpack.DefinePlugin({
            'process.env': { // eslint-disable-line quote-props
                'NODE_ENV': JSON.stringify('development')
            }
        })
    ]
};
