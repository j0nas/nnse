import React, {PropTypes} from "react";
import {Link} from "react-router";

export default class EntityTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeader: [],
            entities: []
        };
    }

    filterTableValues(val) {
        var filter = {
            _id: false,
            __v: true
        };

        return filter[val];
    }

    getTableHeaders(prop) {
        if (!this.filterTableValues(prop)) {
            return <th key={prop}>{prop}</th>;
        }
    }

    getTableContent(key, value) {
        if (key === '_id') {
            return <td key={value}><Link to={this.props.apipath + '/' + value}>{value}</Link></td>;
        }

        if (!this.filterTableValues(key)) {
            return <td key={value}>{value}</td>;
        }
    }

    render() {
        return (
            <div className="carEvaluationInfoContain">
                <div className="containerHeading">{this.props.title}</div>
                <div className="carEvaluationInfo container-fluid">
                    <div className="row-fluid carEvaluationContent">
                        <table className="table">
                            <thead>
                            <tr>
                                {this.props.entities[0] &&
                                Object.keys(this.props.entities[0]).map(prop => this.getTableHeaders(prop))}
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.entities.map(entity => this.getTableRow(entity))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    getTableRow(entity) {
        return <tr key={entity._id}>
            {Object.keys(entity).map(key => this.getTableContent(key, entity[key]))}
        </tr>;
    }
}

EntityTable.propTypes = {
    entities: PropTypes.array.isRequired
};

