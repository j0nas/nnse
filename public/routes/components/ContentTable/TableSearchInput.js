import React, {Component, PropTypes} from "react";

export default class TableSearchInput extends Component {
    constructor(props) {
        super(props);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onSearchChange(event) {
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
        });
    }

    componentWillUpdate() {
        const thisElement = document.getElementById(this.props.id);
        if (thisElement) {
            thisElement.value = "";
        }
    }

    render() {
        return (
            <input
                placeholder={this.props.placeholder}
                id={this.props.id}
                type="search"
                className="form-control"
                onChange={event => this.onSearchChange(event)}/>
        );
    }
}

TableSearchInput.propTypes = {
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
};
