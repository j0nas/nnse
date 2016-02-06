var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

require('./db/db').init('mongodb://127.0.0.1:27017/nnse');

var TenantModel = require('./models/Tenant');
var tenantAPI = require('./routes/resourceAPI')(TenantModel);
app.use('/tenants', tenantAPI);

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
