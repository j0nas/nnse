import React from 'react';

import ContentTable from '../components/ContentTable/EntityTable'

export default class Leases extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/api/leases')
            .then(data => data.json())
            .then(tenants => this.setState({data: tenants}));
    }

    render() {
        return <ContentTable title="Leieforhold" entities={this.state.data} />;
    }
}
