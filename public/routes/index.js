import React from 'react';
import {Router, browserHistory, Route} from 'react-router';

import App from './components/Appcontainer/';

export default class Root extends React.Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    <Route path="*"/>
                </Route>
            </Router>
        );
    }
}

