/**
 * Returns today's date in DD.MM.YY format.
 * @return {string} Today's date, formatted
 */
function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + String(year).slice(2, 4);
}

/**
 * SSoT function defining the additional lease fee for having a secondary tenant
 * @return {number} The fee
 */
function getSecondaryTenantPriceAdditionAmount() {
    return 1000;
}

/**
 * Generates a delimiter-separated string in a specific order with values derived from lease parameter.
 * @param {object} lease The lease entity which to derive the values from
 * @param {string} delimiter The separator to use between the values in the resulting string
 * @param {number} invoiceId The id which to associate with the created line
 * @return {string} The string with values representing formatted invoice data
 */
function generateInvoiceCsvLine(lease, delimiter, invoiceId) {
    const art = 1; // 1 = faktura, 2 = kreditnota
    const dato = getFormattedDate();
    const bilag = invoiceId; // fakturanummer
    const mva = 9;
    const debetkonto = lease._tenant._id; // kundenummer
    const kreditkonto = "";

    const additionalAmount = lease._secondaryTenant ? getSecondaryTenantPriceAdditionAmount() : 0;
    const beloep = lease._room && (Number(lease._room.rent) + additionalAmount);

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

/**
 * Generates a string containing invoice data based on leases data
 * @param {string} delimiter The separator to use for the resulting string
 * @param {object} leases Leases data which to base the CSV output on
 * @param {number} count The initial index which to start with for IDs
 * @return {string} The CSV string
 */
function getInvoiceCsvString(delimiter, leases, count) {
    const invoiceHeaderColumns = ["Art", "Dato", "Bilag", "Mva", "debetkonto", "kreditkonto", "Beløp"];
    const invoiceHeaderString = invoiceHeaderColumns.join(delimiter) + "\n";
    const invoiceCsvLines = leases.map((lease, index) =>
        generateInvoiceCsvLine(lease, delimiter, count + index)).join("\n");

    return invoiceHeaderString + invoiceCsvLines;
}

/**
 * Generates a string of CSV containing address data based on leases data
 * @param {string} delimiter The separator to use for the resulting string
 * @param {object} leases Leases data which to base the CSV output on
 * @return {string} The CSV string
 */
function getAddressCsvString(delimiter, leases) {
    const addressHeaderColumns =
        ["kontonummer", "Navn", "adresse", "postnummer", "Poststed", "telefonnummer", "adresse 2"];
    const addressHeaderString = addressHeaderColumns.join(delimiter) + "\n";
    const addressCsvLines = leases.map(lease => generateAddressCsvLine(lease, delimiter)).join("\n");

    return addressHeaderString + addressCsvLines;
}

/**
 * Creates an array of objects in accordance with the Invoice mongoose model based on provided leases
 * @param {object} leases The foundation which to create the objects from
 * @return {array} The resulting array containing invoice data
 */
function createInvoiceObjects(leases) {
    return leases.map(lease => {
        const priceAddition = lease._secondaryTenant ? getSecondaryTenantPriceAdditionAmount() : 0;
        const leaseCost = Number(lease._room.rent) + priceAddition;
        return {
            amount: leaseCost,
            date: getFormattedDate(),
            tenant: lease._tenant._id
        };
    }
    );
}

module.exports = {
    serveCsv: (responseReference, leasesPath) => {
        const fetch = require('node-fetch');
        fetch.Promise = require('bluebird');

        const invoiceModel = require('../../models/Invoice');
        invoiceModel.nextCount((err, invoiceStartId) => {
            if (err) {
                console.log("Error fetching next ID value for invoices @ makeCsv/index: " + err);
                return;
            }

            fetch(leasesPath)
                .then(leases => leases.json())
                .then(leases => {
                    const delimiter = ",";
                    const invoiceCsvString = getInvoiceCsvString(delimiter, leases, invoiceStartId);
                    const addressCsvString = getAddressCsvString(delimiter, leases);
                    const finalResultString = invoiceCsvString + "\n\n" + addressCsvString;

                    const invoicesToBePersisted = createInvoiceObjects(leases);
                    invoiceModel.create(invoicesToBePersisted, err => {
                        if (err) {
                            console.log("Error persisting invoice objects: " + err);
                        }

                        responseReference.set('Content-Type', 'text/csv');
                        responseReference.set('Content-Disposition', 'attachment;filename=Invoice.csv');
                        responseReference.send(finalResultString);
                    });
                });
        });
    }
};
