import React from 'react';
import ReactDOM from 'react-dom';

import Tenant from '../components/tenant';

fetch('/api/tenants/')
    .then(res => res.json())
    .then(res => res.forEach(tenant =>
        ReactDOM.render((<Tenant {...tenant} />), document.getElementById('root'))
    ));

