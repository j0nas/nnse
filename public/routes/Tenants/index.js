import React from 'react';

import StaticContentBox from '../components/ContentBox/StaticContentBox';
import ContentTable from '../components/ContentTable/EntityTable'

export default class  extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/api/tenants')
            .then(data => data.json())
            .then(tenants => this.setState({data: tenants}));
    }

    render() {
        return <ContentTable title="Leietakere" entities={this.state.data} />;
    }
}
