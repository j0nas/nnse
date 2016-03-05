import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class NavLink extends React.Component {
    render() {
        return <Link {...this.props} activeClassName="active">{this.props.children}</Link>;
    }
}

NavLink.propTypes = {
    to: PropTypes.string.isRequired
};
