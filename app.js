var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var tenants = require('./routes/tenants');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var dbUrl = 'mongodb://127.0.0.1:27017/nnse';
require('./db/db').init(dbUrl);

app.use('/tenants', tenants);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    var errs = {
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    };
    console.log(JSON.stringify(errs));
});


module.exports = app;
