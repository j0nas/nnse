import React from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import {browserHistory} from "react-router";
import FormEntities from "./FormEntities";

export default class EntityForm extends React.Component {
    constructor(props) {
        super(props);

        this.editing = props.entity !== undefined;
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
        Object.keys(entityObject).forEach(field => {
            formBody[field] = document.getElementById(field).value;
        });
        return formBody;
    }

    fillSelectValues(selectElementId, endpoint, identifiers) {
        fetch("/api" + this.props.route.apipath)
            .then(res => res.json())
            .then(currentRouteEntities => {
                let optionIndex = 0;
                fetch("/api" + endpoint)
                    .then(entities => entities.json())
                    .then(entities => {
                        const selectElement = document.getElementById(selectElementId);
                        entities.forEach(entity => {
                            if (currentRouteEntities.filter(currentEntity =>
                                currentEntity[selectElementId]._id === entity._id).length > 0) {
                                return;
                            }

                            const entityIdentifier = this.getEntityIdentifierString(identifiers, entity);
                            selectElement.options[optionIndex++] = new Option(entityIdentifier, entity._id);
                        });
                    });
            });
    }

    getEntityIdentifierString(identifiers, entity) {
        let identifiersString = "";
        let added = false;
        identifiers.forEach(identifier => {
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
        }

        return this.createFormInput(entityObject[field].value, field, entityObject[field].type);
    }

    formatDate(date) {
        const date2 = new Date(date);
        const day = (date2.getDate() > 9 ? "" : "0") + (date2.getDate());
        const month = (date2.getMonth() > 9 ? "" : "0") + (date2.getMonth() + 1);

        return `${date2.getFullYear()}-${month}-${day}`;
    }

    createFormInput(label, fieldId, inputType) {
        let defaultValue = null;
        if (this.editing) {
            defaultValue = this.props.entity[fieldId];

            if (inputType === "date") {
                defaultValue = this.formatDate(defaultValue);
            }
        }

        return (
            <span key={label + '_' + fieldId}>
                <label>{label}</label>
                {inputType === "entity_reference" ?
                    <select id={fieldId} className="form-control"/> :
                    <input type={inputType} id={fieldId} className="form-control" defaultValue={defaultValue}/>}
                <br/>
            </span>
        );
    }

    componentDidMount() {
        this.fillSelectWithEntityCallbacks.forEach(func => func());
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
}
