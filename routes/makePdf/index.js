const pdf = require('html-pdf');
const path = require('path');

const pdfPath = __dirname;
const pdfName = "document.pdf";
const pdfCompletePath = path.join(pdfPath, pdfName);

module.exports = {
    generatePdf: (requestReference, responseReference) => {
        const html = "<div>" + JSON.stringify(requestReference.body) + "</div>";

        pdf.create(html).toFile(pdfCompletePath, err => {
            if (err) {
                console.log("Error when creaing PDF:", err);
                responseReference.sendStatus(500);
                return;
            }

            responseReference.status(200).json(pdfName);
        });
    },

    downloadPdf: (requestReference, responseReference) => {
        const pdfToDownload = path.join(pdfPath, requestReference.query.q);
        responseReference.download(pdfToDownload, pdfName, err => {
            if (err) {
                console.log("Error when downloading PDF:", err)
            }
        });
    }
};
