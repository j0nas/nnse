var mongoose = require('mongoose');

var tenantSchema = mongoose.Schema({
    name_first: String,
    name_middle: String,
    name_last: String,
    email: String,
    phone: String,
    _mailbox: {type: mongoose.Schema.Types.ObjectId, ref: 'Mailbox'}
});

module.exports = mongoose.model('Tenant', tenantSchema);
