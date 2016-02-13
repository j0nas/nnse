import React from 'react';

export default ({siteLink, text}) =>
    (<div>
        <a href={siteLink} className="navButton">{text}</a>
    </div>);
