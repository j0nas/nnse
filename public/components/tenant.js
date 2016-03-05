import React from 'react';


export default class TenantTable extends React.Component {
    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td>Id</td>
                    <td>{this.props._id}</td>
                </tr>
                <tr>
                    <td>Navn</td>
                    <td>{this.props.name_first} {this.props.name_middle} {this.props.name_last}</td>
                </tr>
                <tr>
                    <td>E-post</td>
                    <td>{this.props.email}</td>
                </tr>
                <tr>
                    <td>Telefon</td>
                    <td>{this.props.phone}</td>
                </tr>
                <tr>
                    <td>Postkasse</td>
                    <td>{this.props._mailbox}</td>
                </tr>
                </tbody>
            </table>
        );
    }
}
