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

var mongoose = require('./db/db').init('mongodb://127.0.0.1:27017/nnse');

var tenantModel = require('./models/Tenant');
var tenantAPI = require('./routes/resourceAPI')(tenantModel);
var decoratedTenantAPI = require('./routes/apiDecorators/tenantDecorator')(tenantAPI, tenantModel);
app.use('/tenants/', decoratedTenantAPI);

var mailboxModel = require('./models/Mailbox');
var mailboxAPI = require('./routes/resourceAPI')(mailboxModel);
app.use('/mailboxes/', mailboxAPI);

app.use(function (req, res, next) {
    console.log(req);
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
    next(err);
});

module.exports = app;
