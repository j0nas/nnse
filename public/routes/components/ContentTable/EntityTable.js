import React, {PropTypes} from 'react';


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
            '_id': true,
            '__v': true
        };

        return filter[val];
    }

    getTableHeaders(prop) {
        if (!this.filterTableValues(prop))
            return <th key={prop}>{prop}</th>;
    }

    getTableContent(key, value) {
        if (!this.filterTableValues(key))
            return <td key={value}>{value}</td>;
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
                                Object.keys(this.props.entities[0]).map(prop =>
                                    this.getTableHeaders(prop))}
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.entities.map(entity =>
                                <tr key={entity._id}>
                                    {Object.keys(entity).map(key =>
                                        this.getTableContent(key, entity[key]))}
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

EntityTable.propTypes = {
    entities: PropTypes.array.isRequired
};

