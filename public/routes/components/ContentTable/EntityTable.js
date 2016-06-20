import React, {PropTypes} from "react";
import {Link} from "react-router";
import FormEntities from "../../EntityForm/FormEntities";
import TableSearchInput from "./TableSearchInput";

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
        tableRow = tableRow.sort((a, b) =>
            reverse * (a.cells[column].textContent.trim().localeCompare(b.cells[column].textContent.trim()))
        );

        for (let i = 0; i < tableRow.length; ++i) {
            tableBody.appendChild(tableRow[i]);
        }
    }

    makeSortable(table) {
        const tableHead = table.tHead && table.tHead.rows[0] && table.tHead.rows[0].cells;
        if (!tableHead) {
            return;
        }

        let i = tableHead.length;
        const ref = this;
        while (--i >= 0) {
            (i => {
                let dir = 1;
                tableHead[i].addEventListener('click', () => ref.sortTable(table, i, ++dir % 2 === 0));
            })(i);
        }
    }

    createTableHeader(entityObject) {
        return (
            <thead>
            <tr>
                <th>Id</th>
                {Object.keys(entityObject).map(key => <th key={entityObject[key].value}>{entityObject[key].value}</th>)}
            </tr>
            </thead>
        );
    }

    getTableContent(key, value) {
        return (
            <td key={key + "_" + value}>
                {key === '_id' ? <Link to={this.props.apipath + '/' + value}>{value}</Link> : value}
            </td>
        );
    }

    createTableRow(entity) {
        return (
            <tr key={entity._id}>
                {Object.keys(entity).map(key => this.getTableContent(key, entity[key], entity))}
            </tr>
        );
    }

    formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    formatEntities(entities) {
        if (!entities) {
            return;
        }

        const entityObject = FormEntities.getEntityObject(this.props.apipath);
        const result = [];

        entities.forEach((entity, index) => {
            result[index] = {_id: entity._id};
            Object.keys(entityObject).forEach(key => {
                result[index][key] = this.processTypedEntity(entityObject[key].type, entity[key], entityObject[key]);
            });
        });

        return result;
    }

    processTypedEntity(type, entity, entityObject) {
        switch (type) {
        case "date":
            return this.formatDate(entity);
        case "entity_reference":
            return this.createForeignEntityLink(entityObject.identifiers, entityObject.endpoint, entity);
        default:
            return entity;
        }
    }

    createForeignEntityLink(identifierFields, endpoint, entity) {
        const sanity = identifierFields && endpoint && entity;
        if (!sanity) {
            return;
        }

        return <Link to={endpoint + "/" + entity._id}>{identifierFields.map(field => entity[field] + " ")}</Link>;
    }

    getTableContents(entities) {
        const formatEntities = this.formatEntities(entities);
        return <tbody>{formatEntities.map(entity => this.createTableRow(entity))}</tbody>;
    }

    componentDidUpdate(prevProps) {
        if (this.prevPath) {
            this.prevPath = null;
            this.lastCellSorted = -1;
            const entityTable = document.getElementById("entityTable");
            this.makeSortable(entityTable);

            const searchInput = document.getElementById("tableSearch");
            if (searchInput) {
                searchInput.value = "";
            }
        } else {
            this.prevPath = prevProps.apipath;
        }
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
                            <div className="col-xs-6">
                                <div className="row text-right">
                                    <div className="col-xs-offset-6 col-xs-4">
                                        <TableSearchInput placeholder="Søk" id="tableSearch" tableId={"entityTable"} />
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
                        {this.createTableHeader(FormEntities.getEntityObject(this.props.apipath))}
                        {this.getTableContents(this.props.entities)}
                    </table>
                </div>
            </div>
        );
    }
}

EntityTable.propTypes = {
    entities: PropTypes.array.isRequired
};

