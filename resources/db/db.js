var mongoose = require('mongoose');

module.exports = {
    init: function (dbUrl) {
        mongoose.connect(dbUrl);
        mongoose.connection
            .on('error', function (err) {
                console.log('Failed to connect to DB: ' + err);
            })
            .on('connected', function () {
                console.log('Connected to ' + dbUrl);
            });

        var dbConnectionShutdown = function () {
            mongoose.connection.disconnect()
        };

        process
            .on('SIGINT', dbConnectionShutdown)
            .on('SIGTERM', dbConnectionShutdown);
    }
};