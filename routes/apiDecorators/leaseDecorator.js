function filterInvalidLeases(leases) {
    const today = new Date();

    return leases.filter(lease => {
        const leaseValidFrom = new Date(lease.from);
        const leaseStartedInPast = leaseValidFrom <= today;

        const leaseValidUntil = new Date(lease.to);
        const leaseExpiresInFuture = leaseValidUntil >= today;

        return leaseStartedInPast && leaseExpiresInFuture;
    });
}

module.exports = function(router, mailboxModel) {
    router.get('/valid', (req, res, next) =>
            mailboxModel.find()
                .populate('_tenant')
                .populate('_room')
                .populate('_mailbox')
                .populate('_secondaryTenant')
                .exec((err, leases) => err ? next(err) : res.json(filterInvalidLeases(leases))));

    return router;
};
