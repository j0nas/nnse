const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();

if (process.argv.includes("--dev")) {
    const config = require('./webpack.config.js');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
} else {
    const publicPath = '/build/';
    const outputPath = path.join(__dirname, 'public', 'build');
    app.use(publicPath, express.static(outputPath));
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('./db/db');
mongoose.init('mongodb://127.0.0.1:27017/nnse');

const entityManager = require('./routes/entityManager');
entityManager.init(app, 'api');
['Mailbox', 'Tenant', 'Lease', 'Room', 'Invoice'].forEach(entity => entityManager.setupEntities(entity));

const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
app.use((req, res) => res.sendFile(indexHtmlPath));

const port = 3000;
app.listen(port, err => {
    if (err) {
        throw new Error(err);
    }

    console.log('Listening on http://localhost:' + port);
});
