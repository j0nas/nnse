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

    router.delete('/:mailboxId/tenant/:tenantId', (req, res, next) => {
        mailboxModel.findByIdAndUpdate(
            req.params.mailboxId,
            {$pull: {"tenants": req.params.tenantId}},
            {new: true},
            (err, model) => {
                if (err) return next(err);
                res.json(model);
            });
    });

    return router;
};
