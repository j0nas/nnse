import React from 'react';

import ContentTable from '../components/ContentTable/EntityTable'

export default class Rooms extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/api/rooms')
            .then(data => data.json())
            .then(tenants => this.setState({data: tenants}));
    }

    render() {
        return <ContentTable title="Rom" entities={this.state.data} />;
    }
}
