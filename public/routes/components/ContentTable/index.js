import React, {Component, PropTypes} from "react";
import {Link} from "react-router";
import TableSearchInput from "./TableSearchInput";
import ApplicationEntities from "../../../ApplicationEntities";
import EntityFormatter from "./EntityFormatter";
import EntityTable from "./EntityTable";

export default class ContentTable extends Component {
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
                                        <TableSearchInput placeholder="Søk" id="tableSearch" tableId={"entityTable"}/>
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

