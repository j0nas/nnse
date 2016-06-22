const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [path.join(__dirname, 'public', 'index.js')],
    output: {
        path: path.join(__dirname, 'public', 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    devtool: false,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new webpack.ProvidePlugin({fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'}),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: path.join(__dirname, 'public'),
                query: {
                    babelrc: false,
                    presets: ['es2015', 'react'],
                    plugins: [
                        'transform-react-remove-prop-types',
                        'transform-react-constant-elements',
                        'transform-react-inline-elements'
                    ]
                }
            }
        ]
    }
};
