module.exports = {
    init: (dbUrl) => {
        const mongoose = require('mongoose');
        mongoose.connect(dbUrl);
        mongoose.connection
            .on('error', (err) => console.log('Failed to connect to DB: ' + err + ' - have you started mongod.exe?'))
            .on('connected', () => console.log('Connected to ' + dbUrl));

        autoIncrement = require('mongoose-auto-increment');
        autoIncrement.initialize(mongoose.connection);

        const dbConnectionShutdown = () => {
            mongoose.connection.close();
            process.exit();
        };

        process
            .on('SIGINT', dbConnectionShutdown)
            .on('SIGTERM', dbConnectionShutdown);

        return mongoose;
    }
};
