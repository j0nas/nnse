import React, {Component} from "react";
import ContentTable from "../components/ContentTable";

export default class Entity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    update(pathSuffix) {
        fetch('/api' + pathSuffix)
            .then(data => data.json())
            .then(entities => this.setState({data: entities}));
    }

    componentWillReceiveProps(nextProps) {
        this.update(nextProps.route.path);
    }

    componentDidMount() {
        this.update(this.props.route.path);
    }

    render() {
        return <div>
            <ContentTable title={this.props.route.path} entities={this.state.data} apipath={this.props.route.path}/>
            {this.props.children}
        </div>;
    }
}
