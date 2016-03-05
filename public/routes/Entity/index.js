import React from 'react';

import StaticContentBox from '../components/ContentBox/StaticContentBox';
import EntityTable from '../components/ContentTable/EntityTable'

export default class Entity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    update(pathSuffix) {
        fetch('/api' + pathSuffix)
            .then(data => data.json())
            .then(entities => this.setState({data: entities}));
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.route.path);
    }

    componentDidMount() {
        this.update(this.props.route.path);
    }

    render() {
        return <EntityTable title="Leietakere" entities={this.state.data} apipath={this.props.route.path}/>;
    }
}
