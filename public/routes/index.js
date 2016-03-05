import React from 'react';
import {Router, browserHistory, Route} from 'react-router';

import App from './components/Appcontainer/';
import Invoices from './Invoices/';
import Leases from './Leases/';
import Mailboxes from './Mailboxes/';
import Rooms from './Rooms/';
import Tenants from './Tenants/';

export default class Root extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="/invoices" component={Invoices}/>
                    <Route path="/leases" component={Leases}/>
                    <Route path="/mailboxes" component={Mailboxes}/>
                    <Route path="/rooms" component={Rooms}/>
                    <Route path="/tenants" component={Tenants}/>
                    <Route path="*"/>
                </Route>
            </Router>
        );
    }
}

