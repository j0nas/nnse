/**
 * Generates a delimiter-separated string in a specific order with values derived from lease parameter.
 * @param {object} lease The lease entity which to derive the values from
 * @param {string} delimiter The separator to use between the values in the resulting string
 * @param {number} invoiceId The id which to associate with the created line
 * @return {string} the string with values
 */
function generateCsvLine(lease, delimiter, invoiceId) {
    const date = new Date();
    const year = date.getFullYear();
    const currentDate = date.getDate() + '.' + date.getMonth() + '.' + String(year).slice(2, 4);

    const art = 1;
    const dato = currentDate;
    const bilag = invoiceId; // fakturanummer
    const mva = 9;
    const debetkonto = (lease._tenant && lease._tenant._id) || -1; // kundenummer
    const kreditkonto = "";
    const beloep = lease._room && lease._room.rent;

    const ordered = [art, dato, bilag, mva, debetkonto, kreditkonto, beloep];
    return ordered.join(delimiter) + "\n";
}

module.exports = {
    serveCsv: (responseReference, leasesPath) => {
        const fetch = require('node-fetch');
        fetch.Promise = require('bluebird');

        const invoiceModel = require('../../models/Invoice');
        invoiceModel.nextCount((err, count) => {
            if (err) {
                console.log("Error fetching next ID valuue for invoices @ makeCsv/index: " + err);
                return;
            }

            fetch(leasesPath)
                .then(leases => leases.json())
                .then(leases => {
                    const delimiter = ",";
                    const headerColumns = ["Art", "Dato", "Bilag", "Mva", "debetkonto", "kreditkonto", "Beløp"];
                    const headerString = headerColumns.join(delimiter) + "\n";
                    const csvString = headerString + leases.map((lease, index) =>
                            generateCsvLine(lease, delimiter, count + index)).join('');

                    responseReference.set('Content-Type', 'text/csv');
                    responseReference.set('Content-Disposition', 'attachment;filename=Invoice.csv');
                    responseReference.send(csvString);
                });
        });
    }
};
