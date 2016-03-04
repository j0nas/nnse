const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require('./db/db');
mongoose.init('mongodb://127.0.0.1:27017/nnse');

const entityManager = require('./routes/entityManager');
entityManager.init(app, 'api');
entityManager.setupEntities('Tenant', 'Mailbox', 'Lease');

const port = 3000;
app.listen(port, err => {
    if (err) throw new Error(err);
    console.log('Listening on http://localhost:' + port);
});
