const pdf = require('html-pdf');
const path = require('path');

const pdfPath = __dirname;
const pdfName = "document.pdf";
const pdfCompletePath = path.join(pdfPath, pdfName);

function createTableHeader(entityObject) {
    const tableHeader =
        "<tr>" +
            Object.keys(entityObject).map(key =>
                "<th>" +
                    entityObject[key].value +
                "</th>").join("") +
        "</tr>";

    return tableHeader;
}

function createTableContent(requestReference, entityObject) {
    const tableContent =
        requestReference.body.entities.map(entity =>
            "<tr>" +
                Object.keys(entityObject).map(key =>
                    "<td>" +
                        entity[key] +
                    "</td>").join("") +
            "</tr>").join("");

    return tableContent;
}

module.exports = {
    generatePdf: (requestReference, responseReference) => {
        if (!requestReference.body.entities) {
            console.log("Error when creaing PDF: no entities defined in request.");
            responseReference.sendStatus(400);
            return
        }

        const ApplicationEntities = require("../../public/ApplicationEntities");
        const entityObject = ApplicationEntities.getEntityObject(requestReference.body.apipath);
        var tableHeader = createTableHeader(entityObject);
        var tableContent = createTableContent(requestReference, entityObject);

        const table =
            "<table>" +
            tableHeader +
            tableContent +
            "</table>";

        pdf.create(table).toFile(pdfCompletePath, err => {
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
