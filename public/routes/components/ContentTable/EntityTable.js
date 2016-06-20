import React, {PropTypes} from "react";

export default class EntityTable extends React.Component {
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

        this.lastCellSorted = -1;
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
                {Object.keys(entityObject).map(key => <th key={entityObject[key].value}>{entityObject[key].value}</th>)}
            </tr>
            </thead>
        );
    }

    createTableColumn(key, value) {
        return <td key={key + "_" + value}>{value}</td>;
    }

    createTableRow(entity) {
        return <tr key={entity._id.key}>{Object.keys(entity).map(key => this.createTableColumn(key, entity[key]))}</tr>;
    }

    createTableContents(entities) {
        return <tbody>{entities.map(entity => this.createTableRow(entity))}</tbody>;
    }

    componentWillUpdate() {
        if (this.lastCellSorted && this.lastCellSorted !== -1) {
            const cell = document.getElementById("entityTable").tHead.rows[0].cells[this.lastCellSorted];
            cell.textContent = cell.textContent.slice(0, -2);
        }
    }

    componentDidUpdate() {
        this.makeSortable(document.getElementById("entityTable"));
    }

    render() {
        return (
            <table className="table" id="entityTable">
                {this.createTableHeader(this.props.entityObject)}
                {this.createTableContents(this.props.entities)}
            </table>
        );
    }
}

EntityTable.propTypes = {
    entityObject: PropTypes.object.isRequired,
    entities: PropTypes.array.isRequired
};

