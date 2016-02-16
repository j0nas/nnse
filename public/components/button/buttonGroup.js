import React from 'react';
import Button from './button';

export default React.createClass({
    render: function() {
        var buttons = this.props.data.map((button, i) =>
            (
                <Button siteLink={button.ref} text={button.text} key={"" + i}/>
            )
        );

        return (
            <div className="buttonList">
                {buttons}
            </div>
        );
    }
});

// var links = this.props.data;
// console.log(links);
// export default ({}) =>
//    links.map((result) =><a href={result.ref}>{result.text}</a>);

