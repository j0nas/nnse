import React from 'react';
import ReactDOM from 'react-dom';

import Tenants from '../components/tenant';

fetch('/tenants/')
    .then(res => res.json())
    .then(res => res.forEach(tenant =>
        ReactDOM.render((<Tenants {...tenant} />), document.getElementById('root'))
    ));

