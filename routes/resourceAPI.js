var express = require('express');
var router = express.Router();

module.exports = function (model) {

    router.get('/', function (req, res, next) {
        model.find(function (err, tenants) {
            if (err) return next(err);
            res.json(tenants);
        })
    });

    router.post('/', function (req, res, next) {
        model.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        })
    });

    router.get('/:id', function (req, res, next) {
        model.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        })
    });

    router.put('/:id', function (req, res, next) {
        model.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        });
    });

    router.delete('/:id', function (req, res, next) {
        model.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        })
    });

    return router;
};
