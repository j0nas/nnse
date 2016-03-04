import React from 'react';
import NavLink from './NavLink';

export default class NavBar extends React.Component {
    render() {
        return (
            <div>
                <nav className="sidebar-nav" role="nav">
                    <li className="sidebar-brand background-custom-light-gray">
                        <NavLink to="/"><span className="nav-header">MTakst Mobil</span></NavLink>
                    </li>
                    <li>
                        <NavLink to="/carsearch">Søk på kjøretøy</NavLink>
                    </li>
                    <li>
                        <NavLink to="/customersearch">Søk på kunde</NavLink>
                    </li>
                </nav>
            </div>
        );
    }
}
