module.exports = {
    servePdf: (requestReference, responseReference) => {
        // const htmlPdf = require('html-pdf');
        console.log("reqres: ", requestReference.body);

        return;

        const fetch = require('node-fetch');
        fetch.Promise = require('bluebird');

        const invoiceModel = require('../../models/Invoice');
        invoiceModel.nextCount((err, invoiceStartId) => {
            if (err) {
                console.log("Error fetching next ID value for invoices @ makeCsv/index: " + err);
                return;
            }
            /*
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
                });*/
        });
    }
};
