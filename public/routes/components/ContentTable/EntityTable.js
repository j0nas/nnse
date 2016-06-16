import React, {PropTypes} from "react";
import {Link} from "react-router";
import FormEntities from "../../EntityForm/FormEntities";

export default class EntityTable extends React.Component {

    // TODO replace forEach with map for ESLint compliance
    // TODO extract rendering logic from content parsing logic, split into separate classes

    // http://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
    sortTable(table, col, reverse) {
        const tableBody = table.tBodies[0];
        let tableRow = Array.prototype.slice.call(tableBody.rows, 0);

        reverse = -(+reverse || -1);
        tableRow = tableRow.sort((a, b) =>
            reverse * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()))
        );

        for (let i = 0; i < tableRow.length; ++i) {
            tableBody.appendChild(tableRow[i]);
        }
    }

    makeSortable(table) {
        var tableHead = table.tHead, i;
        tableHead && (tableHead = tableHead.rows[0]) && (tableHead = tableHead.cells);
        if (tableHead) {
            i = tableHead.length;
        } else {
            return;
        }

        const ref = this;
        while (--i >= 0) {
            (function (i) {
                let dir = 1;
                tableHead[i].addEventListener('click', () => ref.sortTable(table, i, (dir = 1 - dir)));
            }(i));
        }
    }

    getTableHeader() {
        const entityObject = FormEntities.getEntityObject(this.props.apipath);
        return (
            <thead>
            <tr>
                <th>Id</th>
                {Object.keys(entityObject).map(key => <th key={entityObject[key].value}>{entityObject[key].value}</th>)}
            </tr>
            </thead>
        );
    }

    getTableRow(entity) {
        return (
            <tr key={entity._id}>
                {Object.keys(entity).map(key => this.getTableContent(key, entity[key], entity))}
            </tr>
        );
    }

    getTableContent(key, value) {
        if (key === '_id') {
            return (
                <td key={value}>
                    <Link to={this.props.apipath + '/' + value}>{value}</Link>
                </td>
            );
        }

        return <td key={key + "_" + value}>{value}</td>;
    }

    // TODO make date formatting less hackish -- look at input type?
    formatDate(timestamp) {
        if (!timestamp) {
            return;
        }

        const stamp = timestamp.split("T")[0];
        const split = stamp.split("-");
        return `${split[2]}.${split[1]}.${split[0]}`;
    }

    formatEntities(entities) {
        const entityObject = FormEntities.getEntityObject(this.props.apipath);
        const result = [];

        entities.map((entity, index) => {
            result[index] = {_id: entity._id};

            Object.keys(entityObject).map(key => {
                if (entityObject[key].type === "date") {
                    result[index][key] = this.formatDate(entity[key]);
                } else if (entityObject[key].identifiers) {
                    result[index][key] = "";
                    entityObject[key].identifiers.map(identifier => {
                        if (entity[key]) {
                            result[index][key] += entity[key][identifier] + " ";
                        }
                    });

                    if (entity[key]) {
                        result[index][key] = (
                            <Link to={entityObject[key].endpoint + "/" + entity[key]._id}>
                                {result[index][key]}
                            </Link>
                        );
                    }
                } else {
                    result[index][key] = entity[key];
                }
            });
        });

        return result;
    }

    getTableContents() {
        const formattedEntities = this.formatEntities(this.props.entities);
        return <tbody>{formattedEntities.map(entity => this.getTableRow(entity))}</tbody>;
    }

    componentDidMount() {
        const entityTable = document.getElementById("entityTable");
        this.makeSortable(entityTable);
    }

    render() {
        return (
            <div className="carEvaluationInfoContain">
                <div className="containerHeading">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-xs-6">
                                {this.props.title}
                            </div>
                            <div className="col-xs-6 text-right">
                                <Link className="btn btn-primary" to={this.props.apipath + '/new'}>Opprett ny</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carEvaluationInfo">
                    <table className="table" id="entityTable">
                        {this.getTableHeader()}
                        {this.getTableContents()}
                    </table>
                </div>
            </div>
        );
    }
}

EntityTable.propTypes = {
    entities: PropTypes.array.isRequired
};

