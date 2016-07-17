import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import TableSearchInput from "./TableSearchInput";
import ApplicationEntities from "../../../ApplicationEntities";
import EntityFormatter from "./EntityFormatter";
import EntityTable from "./EntityTable";

export default class ContentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entities: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            entities: nextProps.entities
        });
    }

    getPropertyNameFromApiPath(apiPath) {
        switch (apiPath) {
            case "/tenants":
                return ["_tenant", "_secondaryTenant"];
            case "/rooms":
                return ["_room"];
            case "/mailboxes":
                return ["_mailbox"];
            default:
                return null;
        }
    }

    componentWillUpdate(nextProps) {
        if (this.props.apipath !== nextProps.apipath) {
            this.setState({
                showingAvailable: false
            });
        }
    }

    filterAssociatedEntities() {
        const searchInput = document.getElementById('tableSearch');
        if (searchInput.value) {
            searchInput.value = '';
            Array.from(document.getElementById('entityTable').tBodies[0].rows).forEach(row => {
                row.style.display = "table-row";
            });
        }

        if (this.state.showingAvailable) {
            fetch("/api" + this.props.apipath)
                .then(res => res.json())
                .then(fetchedEntities =>
                    this.setState({
                        entities: fetchedEntities,
                        showingAvailable: false
                    }));

            return;
        }

        fetch("/api/leases")
            .then(res => res.json())
            .then(leases => {
                let filteredEntities = this.state.entities;
                this.getPropertyNameFromApiPath(this.props.apipath).forEach(prop => {
                    filteredEntities = this.filterEntities(filteredEntities, leases, prop);
                });

                this.setState({
                    entities: filteredEntities,
                    showingAvailable: true
                });
            });
    }

    filterEntities(entities, leases, propName) {
        if (!entities || !leases) {
            return null;
        }

        return entities.filter(entity =>
            !leases.some(lease => lease[propName] && lease[propName]._id === entity._id));
    }

    generateTablePdf() {
        if (!this.state || !this.state.entities) {
            console.log("No entities for PDF.");
            return;
        }

        const options = {
            method: "POST",
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify(this.state.entities)
        };

        fetch("/api/makepdf", options)
            .then(res => res.json())
            .then(res => window.open("/api/downloadpdf?q=" + res));
    }

    render() {
        if (!this.state || !this.state.entities) {
            return <div></div>;
        }

        const apiPath = this.props.apipath;
        const entityObject = ApplicationEntities.getEntityObject(apiPath);
        const formattedEntities = EntityFormatter.formatEntities(this.state.entities, entityObject, apiPath);

        return (
            <div className="carEvaluationInfoContain">
                <div className="containerHeading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-4 col-lg-8">
                                {this.props.title}
                            </div>
                            <div className="col-xs-2 col-lg-1">
                                <TableSearchInput placeholder="Søk" id="tableSearch" tableId={"entityTable"}/>
                            </div>
                            <div className="col-xs-2 col-lg-1">
                                {this.getPropertyNameFromApiPath(this.props.apipath) &&
                                <button className="btn btn-default btn-block"
                                        onClick={() => this.filterAssociatedEntities()}>
                                    {this.state.showingAvailable ? "Ledige" : "Alle"}
                                </button>}
                            </div>
                            <div className="col-xs-2 col-lg-1">
                                <button className="btn btn-default btn-block" onClick={() => this.generateTablePdf()}>
                                    PDF
                                </button>
                            </div>
                            <div className="col-xs-2 col-lg-1">
                                <Link className="btn btn-primary form-control" to={apiPath + '/new'}>Opprett</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carEvaluationInfo">
                    <EntityTable entityObject={entityObject} entities={formattedEntities}/>
                </div>
            </div>
        );
    }
}

ContentTable.propTypes = {
    entities: PropTypes.array.isRequired
};