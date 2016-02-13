var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
    number: Number,
    rent: Number,
    primaryTenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    secondaryTenants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    }]
});

module.exports = mongoose.model('Room', roomSchema);
