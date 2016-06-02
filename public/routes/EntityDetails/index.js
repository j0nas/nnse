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
        sweetAlert(
            {
                title: "Slette entitet?",
                text: "Denne handlingen kan ikke reverseres",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                showCancelButton: true,
                cancelButtonText: "Avbryt"
            },
            submit => {
                if (submit) {
                    const entityApiPath = '/api' + this.props.route.apipath + '/' + this.props.params.id;
                    console.log(entityApiPath);
                    fetch(entityApiPath, {method: 'DELETE'})
                        .then(browserHistory.push(this.props.route.apipath))
                        .catch(err => sweetAlert("Feil", "Noe gikk galt: " + err, "error"));
                }
            });
    }

    update(pathSuffix) {
        fetch('/api' + this.props.route.apipath + '/' + pathSuffix)
            .then(data => data.json())
            .then(entities => this.setState({data: entities}));
    }

    componentDidMount() {
        this.update(this.props.params.id);
    }

    render() {
        return <span>
            <StaticContentBox title={this.props.route.apipath} content={this.state.data}/>
            <ContentBox title="Operasjoner">
                <a className="btn btn-danger" onClick={() => this.deleteEntity()}>Slett</a>
            </ContentBox>
        </span>;
    }
}
