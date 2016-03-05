import React from 'react';
import {Router, browserHistory, Route} from 'react-router';

import App from './components/Appcontainer/';
import Tenants from './Tenants/';

export default class Root extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="/tenants" component={Tenants}/>
                    <Route path="*"/>
                </Route>
            </Router>
        );
    }
}

