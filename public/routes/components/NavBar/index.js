import React from "react";
import NavLink from "./NavLink";

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><NavLink to="/tenants">Leietakere</NavLink></li>
                        <li><NavLink to="/rooms">Rom</NavLink></li>
                        <li><NavLink to="/mailboxes">Postbokser</NavLink></li>
                        <li><NavLink to="/invoices">Faktura</NavLink></li>
                        <li><NavLink to="/leases">Leieforhold</NavLink></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
