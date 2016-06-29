const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const mailboxSchema = mongoose.Schema({
    number: Number
});

mailboxSchema.plugin(autoIncrement.plugin, 'Mailbox');
module.exports = mongoose.model('Mailbox', mailboxSchema);
