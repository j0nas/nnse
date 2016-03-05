import React from 'react';

import StaticContentBox from '../components/ContentBox/StaticContentBox';
import ContentTable from '../components/Tenant/EntityTable'

export default class  extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        /*
         {this.state.data.map(item =>
         <StaticContentBox key={item._id} title="Leietaker" content={item} />)}
         */
        fetch('/api/tenants')
            .then(data => data.json())
            .then(tenants => this.setState({data: tenants}));
    }

    render() {
        return <ContentTable title="Leietakere" entities={this.state.data} />;
    }
}
