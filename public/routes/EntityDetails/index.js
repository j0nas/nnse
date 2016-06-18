import React from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import StaticContentBox from "../components/ContentBox/StaticContentBox";
import sweetAlert from "sweetalert";
import "sweetalert/dist/sweetalert.css";
import {browserHistory} from "react-router";
import EntityForm from "../EntityForm";

export default class EntityDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            editing: false
        };
    }

    deleteEntity() {
        const swalConfig = {
            title: "Slette entitet?",
            text: "Denne handlingen kan ikke reverseres",
            type: "warning",
            confirmButtonColor: "#DD6B55",
            showCancelButton: true,
            cancelButtonText: "Avbryt"
        };

        sweetAlert(
            swalConfig,
            submit => {
                if (submit) {
                    const entityApiPath = '/api' + this.props.route.apipath + '/' + this.props.params.id;
                    fetch(entityApiPath, {method: 'DELETE'})
                        .then(browserHistory.push(this.props.route.apipath))
                        .catch(err => sweetAlert("Feil", "Noe gikk galt: " + err, "error"));
                }
            });
    }

    componentDidMount() {
        fetch('/api' + this.props.route.apipath + '/' + this.props.params.id)
            .then(data => data.json())
            .then(entity => this.setState({data: entity}));
    }

    render() {
        const details = <StaticContentBox title={this.props.route.apipath} content={this.state.data}/>;
        const entityForm = <EntityForm entity={this.state.data} route={{"apipath": this.props.route.apipath}}/>;

        //<a className="btn btn-primary" onClick={() => browserHistory.push(window.location.pathname + '/edit')}>Endre</a>
        const editBtn = <a className="btn btn-primary" onClick={() => this.setState({editing: true})}>Endre</a>;
        const cancelEditBtn = <a className="btn btn-danger" onClick={() => this.setState({editing: false})}>Avbryt</a>;
        const deleteButton = <a className="btn btn-danger" onClick={() => this.deleteEntity()}>Slett</a>;

        return (
            <span>
                {this.state.editing ? entityForm : details}
                <ContentBox title="Operasjoner">
                    {this.state.editing ? cancelEditBtn : editBtn}
                    &nbsp;
                    {!this.state.editing && deleteButton}
                </ContentBox>
            </span>);
    }
}
