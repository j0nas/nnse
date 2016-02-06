var mongoose = require('mongoose');

var mailboxSchema = mongoose.Schema({
    number: Number,
    tenants: [{type: Mongoose.Schema.Types.ObjectId, ref: 'Tenant'}]
});

module.exports = mongoose.model('Mailbox', mailboxSchema);
