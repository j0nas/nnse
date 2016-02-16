import React from 'react';
import ReactDOM from 'react-dom';
import ButtonGroup from '../components/button/buttonGroup';
import Tenant from '../components/tenant';

var links = [
    {ref: '/api/tenants', text: 'Leietakere'},
    {ref: '/api/mailboxes', text: 'Postbokser'}
];

fetch('http://localhost:3000/api/tenants/')
    .then(e => e.json())
    .then(tenants => {
        let thing =
            <div>
                {tenants.map(tenant => <Tenant {...tenant} />)}
                <ButtonGroup data={links}/>
            </div>;

        ReactDOM.render(thing, document.getElementById('root'));
    });
