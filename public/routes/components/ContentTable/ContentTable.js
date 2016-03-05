import React from 'react';
import TenantTable from '../Tenant/TenantTable'

export default class ContentTable extends React.Component {
    constructor() {
        super();
        this.state = {
            tenants: []
        }
    }

    componentDidMount() {
        fetch('/api/tenants')
            .then(data => data.json())
            .then(data => this.setState({tenants: data}));
    }

    render() {
        return (
            <div className="carEvaluationInfoContain">
                <div className="containerHeading">{this.props.title}</div>
                <div className="carEvaluationInfo container-fluid">
                    <div className="row-fluid carEvaluationContent">
                        <TenantTable tenants={this.state.tenants} />
                    </div>
                </div>
            </div>
        );
    }
}
