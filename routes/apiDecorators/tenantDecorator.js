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
                    console.log('Updated tenant!');
                });
            });
    });

    router.delete('/:id/mailbox', (req, res, next) => {
        tenantModel.findByIdAndUpdate(
            req.params.id,
            {_mailbox: null},
            {safe: true, new: true},
            (err, tenant) => {
                if (err) return next(err);

                var options = {
                    host: request.headers.host,
                    port: app.env.port || 3000,
                    path: '/mail',
                    method: 'DELETE'
                };
                require('http').request(options, (res) => {
                    console.log(res);
                    res.json(tenant);
                });
            });
    });

    return router;
};
