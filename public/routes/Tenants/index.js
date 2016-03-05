import React from 'react';

import StaticContentBox from '../components/ContentBox/StaticContentBox';
import EntityTable from '../components/ContentTable/EntityTable'

export default class Tenants extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/api/' + this.props.route.apipath)
            .then(data => data.json())
            .then(tenants => this.setState({data: tenants}));
    }

    render() {
        return <EntityTable title="Leietakere" entities={this.state.data} apipath={this.props.route.apipath}/>;
    }
}
