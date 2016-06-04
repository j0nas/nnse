import React, {PropTypes} from 'react';

import ContentBox from './ContentBox';

export default class StaticContentBox extends React.Component {
    generateViewElement(labelValue, value) {
        return <div className="table-static-key-value-pair" key={labelValue + '_' + value}>
            <label htmlFor={'value_' + value} className="label">{labelValue}</label>&nbsp;
            <span id={'value_' + value}>{value}</span>
        </div>;
    }

    render() {
        var firstTableCounter = 0;
        var secondTableCounter = 0;
        const keys = Object.keys(this.props.content);

        return (
            <ContentBox title={this.props.title}>
                <div className="col-sm-6">
                    { keys.map(prop =>
                        ++firstTableCounter < Math.ceil(keys.length / 2) + 1 ?
                            this.generateViewElement(prop, this.props.content[prop]) : null)}
                </div>
                <div className="col-sm-6">
                    { keys.map(prop =>
                        ++secondTableCounter > Math.ceil(keys.length / 2) ?
                            this.generateViewElement(prop, this.props.content[prop]) : null)}
                </div>
            </ContentBox>
        );
    }
}

StaticContentBox.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired
};
