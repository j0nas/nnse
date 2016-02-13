module.exports = function (router, mailboxModel) {
    router.get('/:id/tenant', (req, res, next) => {
        mailboxModel.findById(req.params.id)
            .populate('tenants')
            .exec((err, mailbox) => {
                if (err) return next(err);
                res.json(mailbox);
            })
    });

    router.put('/:mailboxId/tenant/:tenantId', (req, res, next) => {
        mailboxModel
            .findByIdAndUpdate(req.params.mailboxId, {$push: {"tenants": req.params.tenantId}}, {new: true})
            .populate('tenants')
            .exec((err, mailbox) => {
                if (err) return next(err);

                var tenantsLength = mailbox.tenants.length - 1;
                var addedTenant = mailbox.tenants[tenantsLength];
                addedTenant._mailbox = mailbox._id;
                addedTenant.save((tenantSaveError) => {
                    if (tenantSaveError) return next(tenantSaveError);

                    mailbox.save((mailboxSaveError) => {
                        if (mailboxSaveError) return next(mailboxSaveError);
                        res.json(mailbox);
                    });
                })
            });
    });

    router.delete('/:mailboxId/tenant/:tenantId', (req, res, next) => {
        mailboxModel
            .findById(req.params.mailboxId)
            .populate('tenants')
            .exec((err, mailbox) => {
                if (err) return next(err);

                var tenants = mailbox.tenants;
                var matchingTenantsArray = tenants.filter((tenant) => tenant._id == req.params.tenantId);
                var tenant = matchingTenantsArray[0];

                tenant._mailbox = undefined;
                tenant.save((updateTenantError) => {
                    if (updateTenantError) return next(updateTenantError);

                    mailbox.tenants = mailbox.tenants.filter((tenant) => tenant._id != req.params.tenantId);
                    mailbox.save((updateMailboxError) => {
                        if (updateMailboxError) return next(updateMailboxError);
                        res.json(mailbox);
                    })
                });

            });
    });

    return router;
};
