module.exports = function (router, mailboxModel) {
    router.get('/:id/tenant', (req, res, next) => {
        mailboxModel.findById(req.params.id)
            .populate('tenants')
            .exec((err, mailbox) => {
                if (err) return next(err);
                res.json(mailbox);
            })
    });

    // TODO this currently allows duplicates to be inserted
    router.put('/:id/tenant', (req, res, next) => {
        mailboxModel.findByIdAndUpdate(
            req.params.id,
            {$push: {"tenants": req.body.id}},
            {new: true},
            (err, mailbox) => {
                if (err) return next(err);
                res.json(mailbox);
            });
    });

    router.delete('/:id/tenant', (req, res, next) => {
        mailboxModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {"tenants": req.body.id}},
            {new: true},
            (err, model) => {
                if (err) return next(err);
                res.json(model);
            });
    });

    return router;
};
