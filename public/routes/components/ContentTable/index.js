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
                            <div className="col-xs-6">
                                {this.props.title}
                            </div>
                            <div className="col-xs-6">
                                <div className="row text-right">
                                    <div className="col-xs-offset-6 col-xs-4">
                                        <div className="row">
                                            <div className="col-xs-4">
                                                {
                                                    this.getPropertyNameFromApiPath(this.props.apipath) &&
                                                    <button className="btn btn-default"
                                                    onClick={() => this.filterAssociatedEntities()}>
                                                    {this.state.showingAvailable ? "Ledige" : "Alle"}
                                                    </button>
                                                }
                                            </div>
                                            <div className="col-xs-8">
                                                <TableSearchInput placeholder="Søk" id="tableSearch"
                                                                  tableId={"entityTable"}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-2">
                                        <Link className="btn btn-primary form-control" to={apiPath + '/new'}>
                                            Opprett ny
                                        </Link>
                                    </div>
                                </div>
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

