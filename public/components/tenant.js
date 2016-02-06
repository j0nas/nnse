import React from 'react';

export default ({name_first, name_middle, name_last, email, phone}) =>
    <table>
        <tbody>
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
        </tbody>
    </table>;
