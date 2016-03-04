import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const NavLink = props =>
    <Link {...props} activeClassName="active">{props.children}</Link>;

NavLink.propTypes = {
    to: PropTypes.string.isRequired
};

export default NavLink;
