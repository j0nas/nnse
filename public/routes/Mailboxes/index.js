import React from 'react';

import ContentTable from '../components/ContentTable/EntityTable'

export default class  extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch('/api/mailboxes')
            .then(data => data.json())
            .then(tenants => this.setState({data: tenants}));
    }

    render() {
        return <ContentTable title="Postbokser" entities={this.state.data} />;
    }
}
