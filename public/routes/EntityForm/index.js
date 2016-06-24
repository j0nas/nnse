import React from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import {browserHistory} from "react-router";
import FormEntities from "./FormEntities";
import EntityReferenceSelect from "./EntityReferenceSelect";

export default class EntityForm extends React.Component {
    constructor(props) {
        super(props);
        this.editing = props.entity !== undefined;
    }

    persistEntity() {
        const entityIdIfEditing = this.editing ? "/" + this.props.entity._id : "";
        const entityApiPath = '/api' + this.props.route.apipath + entityIdIfEditing;
        const method = this.editing ? 'PUT' : 'POST';

        const fetchConfig = {
            method: method,
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(this.getFormData())
        };
        fetch(entityApiPath, fetchConfig) // TODO await response before redirecting
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

    formatDate(dateString) {
        const date = new Date(dateString);
        const day = (date.getDate() > 9 ? "" : "0") + (date.getDate());
        const month = (date.getMonth() > 8 ? "" : "0") + (date.getMonth() + 1);

        return `${date.getFullYear()}-${month}-${day}`;
    }

    createFormInput(requestedEntityObject, fieldId) {
        let defaultValue = null;
        if (this.editing) {
            defaultValue = this.props.entity[fieldId];

            if (requestedEntityObject.type === "date") {
                defaultValue = this.formatDate(defaultValue);
            }
        }

        return (
            <span key={requestedEntityObject.value + '_' + fieldId}>
                <label>{requestedEntityObject.value}</label>
                {requestedEntityObject.type === "entity_reference" ?
                    <EntityReferenceSelect
                        id={fieldId}
                        entity={this.props.entity}
                        apipath={this.props.route.apipath}
                        endpoint={requestedEntityObject.endpoint}
                        identifiers={requestedEntityObject.identifiers}/> :
                    <input type={requestedEntityObject.type} id={fieldId} className="form-control"
                           defaultValue={defaultValue}/>}
                <br/>
            </span>
        );
    }

    render() {
        const entityObject = FormEntities.getEntityObject(this.props.route.apipath);
        if (!entityObject) {
            return <div></div>;
        }

        const btnLabel = this.editing ? "Oppdater" : "Opprett";
        return (
            <ContentBox>
                <form id="entity-form" name="entity-form" enctype="application/json">
                    {Object.keys(entityObject).map(field => this.createFormInput(entityObject[field], field))}
                </form>
                <button className="btn btn-success" onClick={() => this.persistEntity()}>{btnLabel}</button>
            </ContentBox>
        );
    }
}
