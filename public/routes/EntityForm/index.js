import React from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import {browserHistory} from "react-router";
import FormEntities from "./FormEntities";

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
        const entityObject = FormEntities.getEntityObject(this.props.route.apipath);
        Object.keys(entityObject).map(field => formBody[field] = document.getElementById(field).value);
        return formBody;
    }

    fillSelectValues(id, endpoint, identifiers) {
        fetch("/api" + endpoint)
            .then(res => res.json())
            .then(res => {
                const element = document.getElementById(id);
                res.map((entity, i) => {
                    const entityIdentifier = this.getEntityIdentifier(identifiers, entity);
                    element.options[i] = new Option(entityIdentifier, entity._id);
                });
            });
    }

    getEntityIdentifier(identifiers, entity) {
        let identifiersString = "";
        let added = false;
        identifiers.map(identifier => {
            if (entity[identifier]) {
                if (added) {
                    identifiersString += " ";
                } else {
                    added = true;
                }

                identifiersString += entity[identifier];
            }
        });

        return identifiersString;
    }

    createFormContentMarkup(entityObject, field) {
        if (entityObject[field].type === "entity_reference") {
            // TODO: extract to documentDidUpdate or something instead of timeOut
            setTimeout(() => this.fillSelectValues(field, entityObject[field].endpoint, entityObject[field].identifiers), 1000);
            return (
                <span key={entityObject[field].value + '_' + field}>
                    <label htmlFor={field}>{entityObject[field].value}</label>
                    <select id={field} className="form-control"/>
                </span>
            );
        }

        return this.createFormInput(entityObject[field].value, field, entityObject[field].type);
    }

    render() {
        const entityObject = FormEntities.getEntityObject(this.props.route.apipath);
        if (!entityObject) {
            return <div></div>;
        }

        return (
            <ContentBox>
                <form id="entity-form" name="entity-form" enctype="application/json">
                    {Object.keys(entityObject).map(field => this.createFormContentMarkup(entityObject, field))}
                </form>
                <br/>
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
