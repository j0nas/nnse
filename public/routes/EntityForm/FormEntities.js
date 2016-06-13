export default class FormEntities {
    static getEntityObject(apiPath) {
        switch (apiPath) {
        case "/tenants":
            return {
                name_first: {
                    value: "Fornavn",
                    type: "text"
                },
                name_middle: {
                    value: "Mellomnavn",
                    type: "text"
                },
                name_last: {
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
                    // _mailbox: "Postkasse" TODO
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
                comment: {
                    value: "Kommentar",
                    type: "text"
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
                    identifiers: ["name_first", "name_middle", "name_last"]
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
                }
            };
        default:
            return null;
        }
    }
}
