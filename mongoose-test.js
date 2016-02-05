var mongoose = require('mongoose');
module.exports = {
    exec: function () {
        mongoose.connect('mongodb://localhost:27017/nnse');

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error: '));
        db.once('open', function () {
            console.log('what up');
        });

        var tenantSchema = mongoose.Schema({name: String});
        tenantSchema.methods.greet = function () {
            console.log(this.name ? "Hi, my name is " + this.name : "I have no name!");
        };

        var Tenant = mongoose.model('Tenant', tenantSchema);

        var registeredTenant = new Tenant({name: 'Jonas'});
        registeredTenant.save(function (err, registeredTenant) {
            if (err) console.log(err);
            registeredTenant.greet();
        });

        Tenant.find(function (err, tenants) {
            if (err) console.log(err);
            console.log(tenants);
        });
    }
};