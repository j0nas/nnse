import React, {PropTypes} from 'react';


export default class EntityTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeader: [],
            entities: []
        };
    }

    getTableHeaders(prop) {
        var filter = {
            '_id': true,
            '__v': true
        };

        if (!filter[prop])
            return <th key={prop}>{prop}</th>;
    }

    getTableContent(key, value) {
        var filter = {
            '_id': true,
            '__v': true
        };

        if (!filter[key])
            return <td key={value}>{value}</td>;
    }

    render() {
        return (
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
        );
    }
}

EntityTable.propTypes = {
    entities: PropTypes.array.isRequired
};

