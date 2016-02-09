import React from 'react';

export default ({_id, name_first, name_middle, name_last, email, phone, _mailbox}) =>
    <table>
        <tbody>
        <tr>
            <td>Id</td>
            <td>{_id}</td>
        </tr>
        <tr>
            <td>Navn</td>
            <td>{name_first} {name_middle} {name_last}</td>
        </tr>
        <tr>
            <td>E-post</td>
            <td>{email}</td>
        </tr>
        <tr>
            <td>Telefon</td>
            <td>{phone}</td>
        </tr>
        <tr>
            <td>Postkasse</td>
            <td>{_mailbox}</td>
        </tr>
        </tbody>
    </table>;
