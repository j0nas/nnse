module.exports = function (router, tenantModel) {
    router.get('/:id/mailbox', (req, res, next) => {
        tenantModel.findById(req.params.id)
            .populate('_mailbox')
            .exec((err, tenant) => {
                if (err) return next(err);
                res.json(tenant);
            })
    });

    router.put('/:id/mailbox', (req, res, next) => {
        tenantModel
            .findByIdAndUpdate(req.params.id, {_mailbox: req.body.id}, {new: true})
            .populate('_mailbox')
            .exec((err, tenant) => {
                if (err) return next(err);
                tenant._mailbox.tenants.push(req.params.id);
                tenant._mailbox.save((saveErr) => {
                    if (saveErr) next(saveErr);
                    res.json(tenant);
                });
            });
    });

    // TODO change PUT ect to use /:id2 instead of body.id
    router.delete('/:id/mailbox', (req, res, next) => {
        tenantModel
            .findById(req.params.id)
            .populate('_mailbox')
            .exec((tenantFetchError, tenant) => {
                if (tenantFetchError) return next(tenantFetchError);
                var arr = tenant._mailbox.tenants;
                const index = arr.indexOf(req.params.id);
                arr.splice(index, 1);

                tenant._mailbox.save((mailboxUpdateError) => {
                    if (mailboxUpdateError) return next(mailboxUpdateError);
                    tenant._mailbox = null;
                    tenant.save((tenantUpdateError) => {
                        if (tenantUpdateError) return next(tenantUpdateError);
                        res.json(tenant);
                    });
                });
            });
    });

    return router;
};
