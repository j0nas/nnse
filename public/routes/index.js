import React from "react";
import {Router, browserHistory, Route} from "react-router";
import App from "./components/Appcontainer/";
import Entity from "./Entity";
import EntityDetails from "./EntityDetails";

export default class Root extends React.Component {
    render() {
        const routes = ['/invoices', '/leases', '/mailboxes', '/rooms', '/tenants'];

        return (
            <Router history={browserHistory}>
                <Route path="/" component={App}>
                    {routes.map(route => <Route path={route} component={Entity} key={route}/>)}
                    {routes.map(route =>
                        <Route path={route + "/:id"} component={EntityDetails} key={route + '_id'} apipath={route}/>)}
                    <Route path="*"/>
                </Route>
            </Router>
        );
    }
}

