var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Tenant = require('../models/Tenant');

router.get('/', function(req, res, next) {
    Tenant.find(function (err, tenants) {
        if (err) return next(err);
        res.json(tenants);
    })
});

router.post('/', function (req, res, next) {
    Tenant.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

router.get('/:id', function (req, res, next) {
    Tenant.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

router.delete('/:id', function (req, res, next) {
    Tenant.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    })
});

module.exports = router;
