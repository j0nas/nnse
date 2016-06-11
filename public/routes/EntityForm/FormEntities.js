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
                break;
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
                break;
            case "/mailboxes":
                return {
                    number: {
                        value: "Nummer",
                        type: "number"
                    }
                };
                break;
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
                break;
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
                    }
                };
                break;
            default:
                return null;
        }
    }
}
