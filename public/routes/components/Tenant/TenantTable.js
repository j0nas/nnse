import React from 'react';


export default class TenantTable extends React.Component {
    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Navn</th>
                    <th>E-post</th>
                    <th>Telefon</th>
                </tr>
                </thead>
                <tbody>
                {this.props.tenants.map(tenant =>
                    <tr>
                        <td>{tenant._id}</td>
                        <td>{tenant.name_first} {tenant.name_middle} {tenant.name_last}</td>
                        <td>E-post</td>
                        <td>{tenant.email}</td>
                        <td>Telefon</td>
                        <td>{tenant.phone}</td>
                        <td>Postkasse</td>
                        <td>{tenant._mailbox}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}
