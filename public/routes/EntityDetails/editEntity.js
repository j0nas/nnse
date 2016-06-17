import React from "react";
import ContentBox from "../components/ContentBox/ContentBox";
import StaticContentBox from "../components/ContentBox/StaticContentBox";
import sweetAlert from "sweetalert";
import "sweetalert/dist/sweetalert.css";
import {browserHistory} from "react-router";

export default class EntityDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
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
            .then(entities => this.setState({data: entities}));
    }

    render() {
        return (
            <span>
                <StaticContentBox title={this.props.route.apipath} content={this.state.data}/>
                <ContentBox title="REDIGER ENTITET">
                    <a className="btn btn-primary" onClick={() =>
                    browserHistory.push(window.location.pathname + '/edit')}>Endre</a>
                    &nbsp;
                    <a className="btn btn-danger" onClick={() => this.deleteEntity()}>Slett</a>
                </ContentBox>
            </span>);
    }
}
