import React from 'react';
import ReactDOM from 'react-dom';

import ButtonGroup from '../components/button/buttonGroup';

var links = [
    {ref: '/tenants', text: 'Leietakere'},
    {ref: '/mailboxes', text: 'Postbokser'}
];

ReactDOM.render((<ButtonGroup data={links}/>), document.getElementById('root'));
