import React from 'react';
import ReactDOM from 'react-dom';

import ButtonGroup from '../components/button/buttonGroup';

var links = [{
    ref: '/tenants',
    text: 'Leietakere'
}, {
    ref: '/mailboxes',
    text: 'Postbokser'
}];
ReactDOM.render((<ButtonGroup data={links}/>), document.getElementById('root'));
/*
 fetch('/api/tenants/')
 .then(res => res.json())
 .then(res => res.forEach(tenant =>
 ReactDOM.render((<Tenant {...tenant} />), document.getElementById('root'))
 ));
 */
