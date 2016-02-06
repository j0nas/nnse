import React from 'react';
import ReactDOM from 'react-dom';

class Tenant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {content: ''}
    }

    componentWillMount() {
        fetch(this.props.resourceUrl)
            .then(res => res.json())
            .then(res => this.setState({
                content: JSON.stringify(res)
            }));
    }

    render() {
        return <div>{this.state.content}</div>;
    }
}

ReactDOM.render((<Tenant resourceUrl="/tenants/56b5cc012e5fd69c04593136"/>), document.getElementById('root'));