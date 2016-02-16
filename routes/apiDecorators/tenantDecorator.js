module.exports = function(router, tenantModel) {
    router.get('/:id/mailbox', (req, res, next) => {
        tenantModel.findById(req.params.id)
            .populate('_mailbox')
            .exec((err, tenant) =>
                err || tenant === null ? next(err) : res.json(tenant));
    });

    router.put('/:tenantId/mailbox/:mailboxId', (req, res, next) => {
        tenantModel
          .findByIdAndUpdate(
            req.params.tenantId,
            {_mailbox: req.params.mailboxId},
            {new: true})
            .populate('_mailbox')
            .exec((err, tenant) => {
                if (err || tenant === null) {
                    return next(err);
                }

                tenant._mailbox.tenants.push(req.params.tenantId);
                tenant._mailbox.save(saveErr =>
                  saveErr ? next(saveErr) : res.json(tenant));
            });
    });

    router.delete('/:id/mailbox', (req, res, next) => {
        tenantModel
            .findById(req.params.id)
            .populate('_mailbox')
            .exec((tenantFetchError, tenant) => {
                if (tenantFetchError) {
                    return next(tenantFetchError);
                }

                if (tenant._mailbox !== null) {
                    var mailboxTenants = tenant._mailbox.tenants;
                    const index = mailboxTenants.indexOf(req.params.id);
                    mailboxTenants.splice(index, 1);

                    tenant._mailbox.save(mailboxUpdateError => {
                      if (mailboxUpdateError) {
                        return next(mailboxUpdateError);
                    }

                      tenant._mailbox = undefined;
                      tenant.save(err => err ? next(err) : res.json(tenant));
                  });
                }
            });
    });

    return router;
};
