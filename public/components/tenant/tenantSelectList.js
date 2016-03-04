import React, { PropTypes } from 'react';

const TenantsSelect = props =>
    <select name="tenants" className="tenantsSelect">
        {props.tenants.map(t => <option value={t._id} key={t._id}>{t.name_first} {t.name_last}</option>)}
    </select>;

TenantsSelect.propTypes = {
    tenants: PropTypes.array.isRequired
};

export default TenantsSelect;

