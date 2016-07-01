const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const tenantSchema = mongoose.Schema({
    ssn: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phone: String
});

tenantSchema.plugin(autoIncrement.plugin, 'Tenant');
module.exports = mongoose.model('Tenant', tenantSchema);
