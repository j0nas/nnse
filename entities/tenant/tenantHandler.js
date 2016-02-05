var mongoose = require('mongoose');

var tenantSchema = mongoose.Schema({
    name: {
        first: String,
        middle: String,
        last: String
    },
    email: String,
    phone: String
});

var Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = {
    Tenant: Tenant,
    getAll: function () {
        Tenant.find(function (err, tenants) {
            if (err) console.log(err);
            return tenants;
        });
    }
};