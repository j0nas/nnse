const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const invoiceSchema = mongoose.Schema({
    amount: Number,
    date: Date,
    _tenant: {
        type: mongoose.Schema.Types.Number,
        ref: 'Tenant'
    }
});

invoiceSchema.plugin(autoIncrement.plugin, 'Invoice');
module.exports = mongoose.model('Invoice', invoiceSchema);
