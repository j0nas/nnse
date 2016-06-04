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
                    name_first: "Fornavn",
                    name_middle: "Mellomnavn",
                    name_last: "Etternavn",
                    email: "E-post",
                    phone: "Telefon"
                    // _mailbox: "Postkasse" TODO
                };
                break;
            case "/rooms":
                return {
                    number: "Nummer",
                    rent: "Leie"
                };
                break;
            case "/mailboxes":
                return {
                    number: "Nummer"
                };
                break;
            case "/invoices":
                return {
                    amount: "Beløp",
                    date: "Dato",
                    comment: "Kommentar"
                };
                break;
            case "/leases":
                return {
                    from: "_Fra",
                    to: "_Til"
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
                    {Object.keys(entityObject).map(field => this.createFormInput(entityObject[field], field))}
                </form>
                <a className="btn btn-success" onClick={() => this.createUser()}>Opprett</a>
            </ContentBox>
        );
    }

    createFormInput(label, fieldId) {
        const dateInput = label[0] === "_";
        if (dateInput) {
            label = label.replace("_", "");
        }

        return (
            <span key={label + '_' + fieldId}>
                <label>{label}</label>
                <input type={dateInput ? "date" : "text"} id={fieldId} className="form-control"/>
                <br/>
            </span>
        );
    }
}
