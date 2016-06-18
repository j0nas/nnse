import React, {PropTypes} from "react";
import {Link} from "react-router";
import FormEntities from "../../EntityForm/FormEntities";

export default class EntityTable extends React.Component {
    constructor() {
        super();
        this.lastCellSorted = -1;
        this.prevPath = "none";
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    handleArrowCharDisplaying(cells, column, reverse) {
        if (this.lastCellSorted !== -1) {
            const cell = cells[this.lastCellSorted];
            cell.textContent = cell.textContent.slice(0, -2);
        }

        const downArrow = " \u2193";
        const upArrow = " \u2191";
        cells[column].textContent += reverse ? downArrow : upArrow;
        this.lastCellSorted = column;
    }

    // http://stackoverflow.com/questions/14267781/sorting-html-table-with-javascript
    sortTable(table, column, reverse) {
        const tableBody = table.tBodies[0];

        this.handleArrowCharDisplaying(table.tHead.rows[0].cells, column, reverse);

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

    formatDate(timestamp) {
        if (!timestamp) {
            return;
        }

        const date = new Date(timestamp);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    formatEntities(entities) {
        const entityObject = FormEntities.getEntityObject(this.props.apipath);
        const result = [];

        entities.forEach((entity, index) => {
            result[index] = {_id: entity._id};

            Object.keys(entityObject).forEach(key => {
                if (entityObject[key].type === "date") {
                    result[index][key] = this.formatDate(entity[key]);
                } else if (entityObject[key].identifiers) {
                    result[index][key] = "";
                    entityObject[key].identifiers.forEach(identifier => {
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

    componentDidUpdate(prevProps) {
        if (this.prevPath) {
            this.prevPath = null;
            this.lastCellSorted = -1;
            const entityTable = document.getElementById("entityTable");
            this.makeSortable(entityTable);

            const searchInput = document.getElementById("filterTableSearch");
            searchInput.value = "";
        } else {
            this.prevPath = prevProps.apipath;
        }
    }

    onSearchChange() {
        const searchInput = document.getElementById("filterTableSearch");
        const searchText = searchInput.value.toLowerCase();

        const entityTable = document.getElementById("entityTable");
        const rows = entityTable.tBodies[0].rows;

        if (searchText === "") {
            for (let i = 0; i < rows.length; i++) {
                rows[i].style.display = "table-row";
            }

            return;
        }

        for (let i = 0; i < rows.length; i++) {
            const cellCount = rows[i].cells.length;
            for (let j = 0; j < cellCount; j++) {
                if (rows[i].cells[j].textContent.toLowerCase().indexOf(searchText) > -1) {
                    rows[i].style.display = "table-row";
                    break;
                }

                if (j === cellCount - 1) {
                    rows[i].style.display = "none";
                }
            }
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
                                        <input type="search" placeholder="Søk" className="form-control"
                                               id="filterTableSearch" onChange={() => this.onSearchChange()}/>
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

