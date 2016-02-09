module.exports = function (router, mailboxModel) {
    router.get('/:id/tenants', (req, res, next) => {
        mailboxModel.findById(req.params.id)
            .populate('tenants')
            .exec((err, mailbox) => {
                if (err) return next(err);
                res.json(mailbox);
            })
    });

    router.put('/:id/tenant', (req, res, next) => {
        console.log('called');
        mailboxModel.findByIdAndUpdate(
            req.params.id,
            {$push: {"tenants": req.body.id}},
            //{safe: true}, //, new: true}, // upsert: true,
            (err, model) => {
                if (err) return next(err);
                res.json(model);
            });

        // TODO model: name: { first: '', middle, last}
        // TODO: respond with updated model!
        // TODO: http delete
    });

    return router;
};
