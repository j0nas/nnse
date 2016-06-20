import React, {PropTypes} from "react";
import {Link} from "react-router";
import FormEntities from "../../EntityForm/FormEntities";
import TableSearchInput from "./TableSearchInput";
import EntityFormatter from "./EntityFormatter";

export default class EntityTable extends React.Component {
    constructor() {
        super();
        this.lastCellSorted = -1;
        this.prevPath = "none";
    }

    handleArrowCharDisplaying(lastCellSorted, cells, column, reverse) {
        if (lastCellSorted !== -1) {
            const cell = cells[lastCellSorted];
            cell.textContent = cell.textContent.slice(0, -2);
        }

        const downArrow = " \u2193";
        const upArrow = " \u2191";
        cells[column].textContent += reverse ? downArrow : upArrow;
        return column;
    }

    // http://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
    sortTable(table, column, reverse) {
        const tableBody = table.tBodies[0];
        this.lastCellSorted =
            this.handleArrowCharDisplaying(this.lastCellSorted, table.tHead.rows[0].cells, column, reverse);

        let tableRow = Array.prototype.slice.call(tableBody.rows, 0);
        reverse = -(Number(reverse) || -1);
        tableRow.sort(
            (a, b) => reverse * (a.cells[column].textContent.trim().localeCompare(b.cells[column].textContent.trim())))
            .forEach(row => tableBody.appendChild(row));
    }

    makeSortable(table) {
        const tableHead = table && table.tHead && table.tHead.rows[0] && table.tHead.rows[0].cells;
        if (!tableHead) {
            return;
        }

        Array.from(tableHead).forEach((cell, i) =>
            (i => {
                let dir = 1;
                cell.addEventListener('click', () => this.sortTable(table, i, ++dir % 2 === 0));
            })(i));
    }

    createTableHeader(entityObject) {
        return (
            <thead>
            <tr>
                <th>Id</th>
                {Object.keys(entityObject).map(key =>
                    <th key={entityObject[key].value}>{entityObject[key].value}</th>)}
            </tr>
            </thead>
        );
    }

    createTableColumn(key, value) {
        return (
            <td key={key + "_" + value}>
                {key === '_id' ? <Link to={this.props.apipath + '/' + value}>{value}</Link> : value}
            </td>
        );
    }

    createTableRow(entity) {
        return (
            <tr key={entity._id}>
                {Object.keys(entity).map(key => this.createTableColumn(key, entity[key], entity))}
            </tr>
        );
    }

    createTableContents(entities) {
        return <tbody>{entities.map(entity => this.createTableRow(entity))}</tbody>;
    }

    componentDidUpdate(prevProps) {
        if (this.prevPath) {
            this.prevPath = null;
            this.lastCellSorted = -1;

            this.makeSortable(document.getElementById("entityTable"));

            const searchInput = document.getElementById("tableSearch");
            if (searchInput) {
                searchInput.value = "";
            }
        } else {
            this.prevPath = prevProps.apipath;
        }
    }

    render() {
        const entityObject = FormEntities.getEntityObject(this.props.apipath);
        const formattedEntities = EntityFormatter.formatEntities(this.props.entities, entityObject);

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
                                        <Link className="btn btn-primary form-control" to={this.props.apipath + '/new'}>
                                            Opprett ny
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carEvaluationInfo">
                    <table className="table" id="entityTable">
                        {this.createTableHeader(entityObject)}
                        {this.createTableContents(formattedEntities)}
                    </table>
                </div>
            </div>
        );
    }
}

EntityTable.propTypes = {
    entities: PropTypes.array.isRequired
};

