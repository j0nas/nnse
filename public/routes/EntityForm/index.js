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
    
    render() {
        const entityObject = FormEntities.getEntityObject(this.props.route.apipath);
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
