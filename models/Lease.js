const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const leaseSchema = mongoose.Schema({
    _tenant: {
        type: mongoose.Schema.Types.Number,
        ref: 'Tenant'
    },
    _room: {
        type: mongoose.Schema.Types.Number,
        ref: 'Room'
    },
    _mailbox: {
        type: mongoose.Schema.Types.Number,
        ref: 'Mailbox'
    },
    _secondaryTenant: {
        type: mongoose.Schema.Types.Number,
        ref: 'Tenant'
    },
    from: Date,
    to: Date
});

leaseSchema.plugin(autoIncrement.plugin, 'Lease');
module.exports = mongoose.model('Lease', leaseSchema);
