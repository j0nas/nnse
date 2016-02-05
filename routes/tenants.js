var express = require('express');
var router = express.Router();
var tenantHandler = require('../entities/tenant/tenantHandler');
router.get('/', function(req, res, next) {
    res.send(tenantHandler.getAll());
});

module.exports = router;
