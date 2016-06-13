import React from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import {browserHistory} from "react-router";
import FormEntities from "./FormEntities";

export default class EntityForm extends React.Component {
    constructor() {
        super();
        this.fillSelectWithEntityCallbacks = [];
    }

    createEntity() {
        const entityApiPath = '/api' + this.props.route.apipath;
        fetch(entityApiPath, {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
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

    fillSelectValues(selectElementId, endpoint, identifiers) {
        fetch("/api" + this.props.route.apipath).then(res => res.json()).then(currentRouteEntites => {
            let optionIndex = 0;
            fetch("/api" + endpoint)
                .then(entities => entities.json())
                .then(entities => {
                    const element = document.getElementById(selectElementId);
                    entities.map(entity => {
                        if (currentRouteEntites.filter(e => e[selectElementId] === entity._id).length > 0) {
                            return;
                        }

                        const entityIdentifier = this.getEntityIdentifier(identifiers, entity);
                        element.options[optionIndex++] = new Option(entityIdentifier, entity._id);
                    });
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
            this.fillSelectWithEntityCallbacks.push(() =>
                this.fillSelectValues(field, entityObject[field].endpoint, entityObject[field].identifiers));
            return this.createFormInput(entityObject[field].value, field, entityObject[field].type);
        }

        return this.createFormInput(entityObject[field].value, field, entityObject[field].type);
    }

    componentDidMount() {
        this.fillSelectWithEntityCallbacks.map(func => func());
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
                <a className="btn btn-success" onClick={() => this.createEntity()}>Opprett</a>
            </ContentBox>
        );
    }

    createFormInput(label, fieldId, inputType) {
        return (
            <span key={label + '_' + fieldId}>
                <label>{label}</label>
                {inputType === "entity_reference" ?
                    <select id={fieldId} className="form-control"/> :
                    <input type={inputType} id={fieldId} className="form-control"/>}
                <br/>
            </span>
        );
    }
}
