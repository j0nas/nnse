module.exports = {
    getEntityObject(apiPath) {
        switch (apiPath) {
        case "/tenants":
            return {
                ssn: {
                    value: "Personnummer",
                    type: "number"
                },
                firstName: {
                    value: "Fornavn",
                    type: "text"
                },
                middleName: {
                    value: "Mellomnavn",
                    type: "text"
                },
                lastName: {
                    value: "Etternavn",
                    type: "text"
                },
                email: {
                    value: "E-post",
                    type: "email"
                },
                phone: {
                    value: "Telefon",
                    type: "tel"
                }
            };
        case "/rooms":
            return {
                number: {
                    value: "Nummer",
                    type: "number"
                },
                rent: {
                    value: "Leie",
                    type: "number"
                }
            };
        case "/mailboxes":
            return {
                number: {
                    value: "Nummer",
                    type: "number"
                }
            };
        case "/invoices":
            return {
                amount: {
                    value: "Beløp",
                    type: "number"
                },
                date: {
                    value: "Dato",
                    type: "date"
                },
                _tenant: {
                    value: "Fakturert leietaker",
                    type: "entity_reference",
                    endpoint: "/tenants",
                    identifiers: ["firstName", "middleName", "lastName"]
                }
            };
        case "/leases":
            return {
                from: {
                    value: "Fra",
                    type: "date"
                },
                to: {
                    value: "Til",
                    type: "date"
                },
                _tenant: {
                    value: "Leietaker",
                    type: "entity_reference",
                    endpoint: "/tenants",
                    identifiers: ["firstName", "middleName", "lastName"]
                },
                _room: {
                    value: "Rom",
                    type: "entity_reference",
                    endpoint: "/rooms",
                    identifiers: ["number"]
                },
                _mailbox: {
                    value: "Postboks",
                    type: "entity_reference",
                    endpoint: "/mailboxes",
                    identifiers: ["number"]
                },
                _secondaryTenant: {
                    value: "Sekundær leietaker",
                    type: "entity_reference",
                    endpoint: "/tenants",
                    identifiers: ["firstName", "middleName", "lastName"],
                    optional: true
                }
            };
        default:
            throw new Error("Unknown entity path: " + apiPath);
        }
    }
};
