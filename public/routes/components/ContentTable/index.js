import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import TableSearchInput from "./TableSearchInput";
import ApplicationEntities from "../../../ApplicationEntities";
import EntityFormatter from "./EntityFormatter";
import EntityTable from "./EntityTable";

export default class ContentTable extends Component {
    showUnassociatedEntities() {
        // new branch!
        // clear search field query first?

        // iterate trhough entities, see if they are associated with entities found in given /apipath (leases)
        console.log(this.props.entities);
        /*
        const searchText = event.target.value.toLowerCase();
        const entityTable = document.getElementById(this.props.tableId);
        const rows = Array.from(entityTable.tBodies[0].rows);

        if (searchText === "") {
            rows.forEach(row => {
                row.style.display = "table-row";
            });
            return;
        }

        rows.forEach(row => {
            const cellCount = row.cells.length;
            for (let j = 0; j < cellCount; j++) {
                if (row.cells[j].textContent.toLowerCase().includes(searchText)) {
                    row.style.display = "table-row";
                    break;
                }

                if (j === cellCount - 1) {
                    row.style.display = "none";
                }
            }
        });*/
    }

    render() {
        const apiPath = this.props.apipath;
        const entityObject = ApplicationEntities.getEntityObject(apiPath);
        const formattedEntities = EntityFormatter.formatEntities(this.props.entities, entityObject, apiPath);

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
                                                <button className="btn btn-default"
                                                        onClick={() => this.showUnassociatedEntities()}>
                                                    Ledige
                                                </button>
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

