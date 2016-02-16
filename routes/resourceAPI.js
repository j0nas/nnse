module.exports = function(model) {
    var router = require('express').Router(); // eslint-disable-line new-cap

    router.get('/', (req, res, next) =>
      model.find((err, items) => err ? next(err) : res.json(items)));

    router.post('/', (req, res, next) =>
      model.create(req.body, (err, post) => err ? next(err) : res.json(post)));

    router.get('/:id', (req, res, next) =>
    model.findById(req.params.id, req.body,
        (err, item) => err ? next(err) : res.json(item)));

    router.put('/:id', (req, res, next) =>
      model.findByIdAndUpdate(req.params.id, req.body,
        (err, post) => err ? next(err) : res.json(post)));

    router.delete('/:id', (req, res, next) =>
    model.findByIdAndRemove(req.params.id, req.body,
        (err, post) => err ? next(err) : res.json(post)));

    return router;
};
