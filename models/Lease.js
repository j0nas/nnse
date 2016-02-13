var mongoose = require('mongoose');

var leaseSchema = mongoose.Schema({
    _tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    _room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    _mailbox: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mailbox'
    },
    duration: {
        from: Date,
        to: Date
    }
});

module.exports = mongoose.model('Lease', leaseSchema);
