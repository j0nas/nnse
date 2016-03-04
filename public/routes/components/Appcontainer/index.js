import React from 'react';

import NavBarTop from '../NavBar/NavBar';

import '../../../css/main.css';

export default class extends React.Component {
    render() {
        return (
            <div>
                <NavBarTop />
                <div id="react-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
