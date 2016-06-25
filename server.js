const express = require('express');
const path = require('path');
const app = express();
const fetch = require('node-fetch');
fetch.Promise = require('bluebird');
const fs = require("fs");

const debugMode = process.argv.indexOf("--dev") > -1;
if (debugMode) {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const config = require('./webpack.config.js');
    const compiler = webpack(config);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
} else {
    const outputPath = path.join(__dirname, 'public', 'build');
    app.use('/build/', express.static(outputPath));
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const mongoose = require('./db/db');
const localDbUrl = "mongodb://127.0.0.1:27017/nnse";
const remoteDbUrl = "mongodb://nnse:nnse@ds019654.mlab.com:19654/heroku_grcd8z76";
const urlToUse = debugMode ? localDbUrl : remoteDbUrl;
mongoose.init(urlToUse);

const entityManager = require('./routes/entityManager');
// TODO get these from FormEntities -> single source of truth!
['Mailbox', 'Tenant', 'Lease', 'Room', 'Invoice'].forEach(entity => entityManager.setupEntity(app, 'api', entity));


function generateCsvLine(lease, delimiter) {
    const date = new Date();
    const year = date.getFullYear();
    const currentDate = date.getDate() + '.' + date.getMonth() + '.' + String(year).slice(2, 4);

    const art = 1;
    const dato = currentDate;
    const bilag = 0; // fakturanummer
    const mva = 9;
    const debetkonto = 0; // kundenummer
    const kreditkonto = "";
    const beloep = lease._room && lease._room.rent;

    const ordered = [art, dato, bilag, mva, debetkonto, kreditkonto, beloep];
    return ordered.join(delimiter) + "\n";
}

app.use("/api/makecsv", (req, res) => {
    fetch("http://localhost:3000/api/leases")
        .then(res => res.json())
        .then(leases => {
            const delimiter = ",";

            const headerColumns = ["Art", "Dato", "Bilag", "Mva", "debetkonto", "kreditkonto", "Beløp"];
            const headerString = headerColumns.join(delimiter) + "\n";

            const csvString = headerString + leases.map(lease => generateCsvLine(lease, delimiter)).join('');
            fs.writeFile('./Invoices.csv', csvString, () => console.log("printed!"));
        });

    res.sendStatus(200);
});

const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
app.use((req, res) => res.sendFile(indexHtmlPath));

const port = process.env.PORT || 3000;
app.listen(port, err => {
    if (err) {
        throw new Error(err);
    }

    const url = debugMode ? "localhost:" + port : "nnse.herokuapp.com";
    console.log('Listening on http://' + url);
});
