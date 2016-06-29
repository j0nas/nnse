const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const roomSchema = mongoose.Schema({
    number: Number,
    rent: Number
});

roomSchema.plugin(autoIncrement.plugin, 'Room');
module.exports = mongoose.model('Room', roomSchema);
