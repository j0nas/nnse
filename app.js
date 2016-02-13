var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var favicon = require('express-favicon');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img/favicon.ico')));
app.set('json spaces', 2);

var mongoose = require('./db/db');
mongoose.init('mongodb://127.0.0.1:27017/nnse');

var entityManager = require('./routes/entityManager');
entityManager.init(app, 'api');
entityManager.setupEntities('Tenant', 'Mailbox', 'Lease');

app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    var errs = {
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    };
    console.log(JSON.stringify(errs));
    next(err);
});

module.exports = app;
