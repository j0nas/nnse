module.exports = function (router, tenantModel) {
    router.get('/:id/mailbox', (req, res, next) => {
        tenantModel.findById(req.params.id)
            .populate('_mailbox')
            .exec((err, tenant) => {
                if (err) return next(err);
                res.json(tenant);
            })
    });

    router.post('/:id/mailbox', (req, res, next) => {
        tenantModel.findByIdAndUpdate(req.params.id, {_mailbox: req.body.id}, (tenantErr, tenant) => {
            if (tenantErr) return next(err);

            tenantModel.findById(tenant._id)
                .populate('_mailbox')
                .exec((newErr, t) => {
                    if (newErr) return next(newErr);
                    res.json(t);
                });
        })
    });

    return router;
};
