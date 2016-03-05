import React from 'react';
import NavLink from './NavLink';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Vis navigasjonsmeny</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><NavLink to="#">Hovedside</NavLink></li>
                            <li><a href="/tenants">Leietakere</a></li>
                            <li><a href="#">Rom</a></li>
                            <li><a href="#">Postbokser</a></li>
                            <li><a href="#">Faktura</a></li>
                            <li><a href="#">Leieforhold</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                   aria-haspopup="true" aria-expanded="false">
                                    Edgar S.
                                    <span className="caret"></span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Profil</a></li>
                                    <li><a href="#">Div. lenke</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Statistikk</a></li>
                                    <li role="separator" className="divider"></li>
                                    <li><a href="#">Logg ut</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
