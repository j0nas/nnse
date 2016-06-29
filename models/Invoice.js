const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const invoiceSchema = mongoose.Schema({
    amount: Number,
    date: Date,
    comment: String,
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    }
});

invoiceSchema.plugin(autoIncrement.plugin, 'Invoice');
module.exports = mongoose.model('Invoice', invoiceSchema);
