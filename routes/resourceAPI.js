var express = require('express');
var router = express.Router();

module.exports = function (model) {

    router.get('/', function (req, res, next) {
        model.find(function (err, items) {
            if (err) return next(err);
            res.json(items);
        })
    });

    router.post('/', function (req, res, next) {
        model.create(req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
        })
    });

    router.get('/:id', function (req, res, next) {
        model.findById(req.params.id, req.body, function (err, item) {
            if (err) return next(err);
            res.json(item);
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
