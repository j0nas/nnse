const pdf = require('html-pdf');
const path = require('path');

const pdfPath = __dirname;
const pdfName = "document.pdf";
const pdfCompletePath = path.join(pdfPath, pdfName);

function createTableHeader(entityObject) {
    return "<tr>" + (
            Object.keys(entityObject).map(key =>
                "<th>" + entityObject[key].value + "</th>"
            ).join("")
        ) + "</tr>";
}

function formatEntityContent(entityObject, key, entity) {
    if (!entityObject[key].type || !entity[key]) {
        return entity[key] || "";
    }

    switch (entityObject[key].type) {
        case "entity_reference":
            return entityObject[key].identifiers.map(identifier => entity[key][identifier]).join(" ");
        case "date":
            return "DATE!!";
        default:
            throw new Error("Unhandled type: " + entityObject[key].type);
    }
}

function createTableContent(requestReference, entityObject) {
    const tableContent =
        requestReference.body.entities.map(entity =>
            "<tr>" +
                Object.keys(entityObject).map(key =>
                    "<td>" +
                        formatEntityContent(entityObject, key, entity) +
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
        const tableHeader = createTableHeader(entityObject);
        const tableContent = createTableContent(requestReference, entityObject);

        const table = "<table style='width: 100%; text-align: center'>" + tableHeader + tableContent + "</table>";

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
