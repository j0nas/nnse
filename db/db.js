module.exports = {
    init: function (dbUrl) {
        var mongoose = require('mongoose');
        mongoose.connect(dbUrl);
        mongoose.connection
            .on('error', function (err) {
                console.log('Failed to connect to DB: ' + err + ' - have you started mongod.exe?');
            })
            .on('connected', function () {
                console.log('Connected to ' + dbUrl);
            });

        var dbConnectionShutdown = function () {
            mongoose.connection.close();
            process.exit();
        };

        process
            .on('SIGINT', dbConnectionShutdown)
            .on('SIGTERM', dbConnectionShutdown);

        return mongoose;
    }
};