const mongoose = require('mongoose');

const tenantSchema = mongoose.Schema({
    ssn: Number,
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    phone: String,
    _mailbox: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mailbox'
    }
});

module.exports = mongoose.model('Tenant', tenantSchema);
