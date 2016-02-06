import React from 'react';
import ReactDOM from 'react-dom';

import Tenants from '../components/tenant';

fetch('/tenants/')
    .then(res => res.json())
    .then(res => ReactDOM.render((<Tenants {...res[4]} />), document.getElementById('root')));

