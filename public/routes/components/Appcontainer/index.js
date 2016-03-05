import React from 'react';

import NavBar from '../NavBar/';

import '../../../css/main.css';
import '../../../css/carEvaluation.css';
import '../../../css/style.css';

export default class extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div id="react-container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
