var mongoose = require('mongoose');

var tenantSchema = mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phone: String,
    _mailbox: {type: mongoose.Schema.Types.ObjectId, ref: 'Mailbox'}
});

module.exports = mongoose.model('Tenant', tenantSchema);
