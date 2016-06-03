import React from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import {browserHistory} from "react-router";

export default class EntityForm extends React.Component {
    createUser() {
        const entityApiPath = '/api' + this.props.route.apipath;
        fetch(entityApiPath, {method: 'DELETE'})
            .then(browserHistory.push(this.props.route.apipath))
            .catch(err => console.log(err));
    }

    render() {
        // {this.props.fields.map(field => this.getTableHeaders(field))}
        let obj;
        switch (this.props.route.apipath) {
            case "/tenants":
                obj = {
                    name_first: "Fornavn",
                    name_middle: "Mellomnavn",
                    name_last: "Etternavn",
                    email: "E-post",
                    phone: "Telefon",
                    _mailbox: "Postkasse"
                };
                break;
            default:
                return <div></div>;
        }
        return (
            <ContentBox>
                <form>
                {Object.keys(obj).map(key =>
                    <span>
                        <label>{obj[key]}</label>
                        <input type="text" className="form-control"/>
                        <br/>
                    </span>)}
                </form>
                <a className="btn btn-success" onClick={() => this.createUser()}>Opprett</a>
            </ContentBox>
        );
    }
}
