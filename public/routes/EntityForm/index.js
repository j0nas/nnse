import React from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import {browserHistory} from "react-router";

export default class EntityForm extends React.Component {
    createUser() {
        const entityApiPath = '/api' + this.props.route.apipath;
        fetch(entityApiPath, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(this.getFormData())
        })
            .then(browserHistory.push(this.props.route.apipath))
            .catch(err => console.log(err));
    }

    getFormData() {
        const formBody = {};
        const entityObject = this.getEntityObject();
        Object.keys(entityObject).map(field => formBody[field] = document.getElementById(field).value);
        return formBody;
    }

    getEntityObject() {
        switch (this.props.route.apipath) {
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
                    }
                };
                break;
            default:
                return null;
        }
    }

    render() {
        const entityObject = this.getEntityObject();
        if (entityObject == null) {
            return <div></div>;
        }

        return (
            <ContentBox>
                <form id="entity-form" name="entity-form" enctype="application/json">
                    {Object.keys(entityObject).map(field =>
                        this.createFormInput(entityObject[field].value, field, entityObject[field].type))}
                </form>
                <a className="btn btn-success" onClick={() => this.createUser()}>Opprett</a>
            </ContentBox>
        );
    }

    createFormInput(label, fieldId, inputType) {
        return (
            <span key={label + '_' + fieldId}>
                <label>{label}</label>
                <input type={inputType} id={fieldId} className="form-control"/>
                <br/>
            </span>
        );
    }
}
