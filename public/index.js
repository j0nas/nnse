import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';

// import ButtonGroup from './components/button/buttonGroup';

// import Tenant from './components/tenant';
// import TenantSelectList from './components/tenant/TenantSelectList';

import Root from './routes/index';

// var links = [
//    {ref: '/api/tenants', text: 'Leietakere'},
//    {ref: '/api/mailboxes', text: 'Postbokser'}
// ];
//
// fetch('http://localhost:3000/api/tenants/')
//    .then(e => e.json())
//    .then(tenants => {
//        let thing = <TenantSelectList tenants={tenants} />;
//        //    <div>
//        //        {tenants.map(tenant => <Tenant {...tenant} />)}
//        //        {<CarInfoTable {...carInfo} />}
//        //        <ButtonGroup data={links}/>
//        //    </div>;
//
//        //ReactDOM.render(thing, document.getElementById('root'));
//    });

render(<Root />, document.getElementById('root'));
