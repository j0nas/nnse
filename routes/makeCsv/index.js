function generateCsvLine(lease, delimiter) {
    const date = new Date();
    const year = date.getFullYear();
    const currentDate = date.getDate() + '.' + date.getMonth() + '.' + String(year).slice(2, 4);

    const art = 1;
    const dato = currentDate;
    const bilag = 0; // fakturanummer
    const mva = 9;
    const debetkonto = 0; // kundenummer
    const kreditkonto = "";
    const beloep = lease._room && lease._room.rent;

    const ordered = [art, dato, bilag, mva, debetkonto, kreditkonto, beloep];
    return ordered.join(delimiter) + "\n";
}

module.exports = {
    serveCsv: function (responseReference) {
        const fetch = require('node-fetch');
        fetch.Promise = require('bluebird');
        const fs = require("fs");

        fetch("http://localhost:3000/api/leases")
            .then(leases => leases.json())
            .then(leases => {
                const delimiter = ",";
                const headerColumns = ["Art", "Dato", "Bilag", "Mva", "debetkonto", "kreditkonto", "Beløp"];
                const headerString = headerColumns.join(delimiter) + "\n";
                const csvString = headerString + leases.map(lease => generateCsvLine(lease, delimiter)).join('');

                responseReference.set('Content-Type', 'text/csv');
                responseReference.set('Content-Disposition', 'attachment;filename=Invoice.csv');
                responseReference.send(csvString);
            });

    }
};
