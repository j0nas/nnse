import React from 'react';

export default class ContentBox extends React.Component {
    render() {
        return (
            <div className="carEvaluationInfoContain">
                <div className="containerHeading">{this.props.title}</div>
                <div className="carEvaluationInfo container-fluid" >
                    <div className="row-fluid carEvaluationContent">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
