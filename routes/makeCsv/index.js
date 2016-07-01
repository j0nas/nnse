/**
 * Generates a delimiter-separated string in a specific order with values derived from lease parameter.
 * @param {object} lease The lease entity which to derive the values from
 * @param {string} delimiter The separator to use between the values in the resulting string
 * @param {number} invoiceId The id which to associate with the created line
 * @return {string} The string with values representing formatted invoice data
 */
function generateInvoiceCsvLine(lease, delimiter, invoiceId) {
    const date = new Date();
    const year = date.getFullYear();
    const currentDate = date.getDate() + '.' + date.getMonth() + '.' + String(year).slice(2, 4);

    const art = 1;
    const dato = currentDate;
    const bilag = invoiceId; // fakturanummer
    const mva = 9;
    const debetkonto = lease._tenant._id; // kundenummer
    const kreditkonto = "";
    const beloep = lease._room && lease._room.rent;

    const orderedValues = [art, dato, bilag, mva, debetkonto, kreditkonto, beloep];
    return orderedValues.join(delimiter);
}

/**
 * Generates a delimiter-separated string in a specific order with values derived from lease parameter.
 * @param {object} lease The lease entity which to derive the values from
 * @param {string} delimiter The separator to use between the values in the resulting string
 * @return {string} The string with values representing address data to accompany invoices
 */
function generateAddressCsvLine(lease, delimiter) {
    const tenant = lease._tenant;
    if (!tenant) {
        return "NO TENANT DATA FOR LEASE WITH ID " + lease._id;
    }

    const optionalMiddleName = tenant.middleName ? tenant.middleName + " " : "";

    const kontonummer = tenant._id; // kundenummer
    const navn = tenant.firstName + " " + optionalMiddleName + tenant.lastName;
    const adresse = "John Colletts Alle 110";
    const postnummer = "0870";
    const poststed = "OSLO";
    const telefonnummer = tenant.phone;
    const adresse2 = lease._mailbox ? "PB. " + lease._mailbox.number : "";

    const orderedValues = [kontonummer, navn, adresse, postnummer, poststed, telefonnummer, adresse2];
    return orderedValues.join(delimiter);
}

function getInvoiceCsvString(delimiter, leases, count) {
    const invoiceHeaderColumns = ["Art", "Dato", "Bilag", "Mva", "debetkonto", "kreditkonto", "Beløp"];
    const invoiceHeaderString = invoiceHeaderColumns.join(delimiter) + "\n";
    const invoiceCsvLines = leases.map((lease, index) =>
        generateInvoiceCsvLine(lease, delimiter, count + index)).join("\n");

    return invoiceHeaderString + invoiceCsvLines;
}

function getAddressCsvString(delimiter, leases) {
    const addressHeaderColumns =
        ["kontonummer", "Navn", "adresse", "postnummer", "Poststed", "telefonnummer", "adresse 2"];
    const addressHeaderString = addressHeaderColumns.join(delimiter) + "\n";
    const addressCsvLines = leases.map(lease => generateAddressCsvLine(lease, delimiter)).join("\n");

    return addressHeaderString + addressCsvLines;
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
                    const invoiceCsvString = getInvoiceCsvString(delimiter, leases, count);
                    const addressCsvString = getAddressCsvString(delimiter, leases);
                    const finalResultString = invoiceCsvString + "\n\n" + addressCsvString;

                    responseReference.set('Content-Type', 'text/csv');
                    responseReference.set('Content-Disposition', 'attachment;filename=Invoice.csv');
                    responseReference.send(finalResultString);
                });
        });
    }
};
