var mongoose = require('mongoose');

var invoiceSchema = mongoose.Schema({
    amount: Number,
    date: Date,
    comment: String,
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
