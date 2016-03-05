import React from 'react';
import StaticContentBox from '../components/ContentBox/StaticContentBox';

export default class EntityDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    update(pathSuffix) {
        fetch('/api' + this.props.route.apipath + '/' + pathSuffix)
            .then(data => data.json())
            .then(entities => this.setState({data: entities}));
    }

    componentDidMount() {
        this.update(this.props.params.id);
    }

    render() {
        return <StaticContentBox title={this.props.route.apipath} content={this.state.data} />;;
    }
}
