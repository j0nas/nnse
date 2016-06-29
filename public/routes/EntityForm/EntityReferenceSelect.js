import React, {Component, PropTypes} from "react";

export default class EntityReferenceSelect extends Component {
    fillSelectValues() {
        const selectElement = document.getElementById(this.props.id);

        fetch("/api" + this.props.apipath)
            .then(res => res.json())
            .then(currentEntities => {
                fetch("/api" + this.props.endpoint)
                    .then(foreignEntities => foreignEntities.json())
                    .then(foreignEntities => {
                        if (this.props.optional === true) {
                            this.addSelectElementOption("", "", selectElement, true);
                        }

                        foreignEntities.forEach(foreignEntity => {
                            const belongsToEditedEntity =
                                this.props.entity && foreignEntity._id === this.props.entity[this.props.id];

                            if (belongsToEditedEntity || !this.entityIsAssociated(foreignEntity, currentEntities)) {
                                const identifierString =
                                    this.getEntityIdentifierString(this.props.identifiers, foreignEntity);
                                this.addSelectElementOption(identifierString,
                                    foreignEntity._id, selectElement, belongsToEditedEntity);
                            }
                        });
                    });
            });
    }

    addSelectElementOption(text, value, selectElement, setAsSelected) {
        const optionIndex = selectElement.options.length;
        selectElement.options[optionIndex] = new Option(text, value);
        if (setAsSelected) {
            selectElement.options[optionIndex].selected = true;
        }
    }

    entityIsAssociated(currentEntity, entityCollection) {
        return entityCollection.some(entity => Object.keys(entity).some(
            key => entity[key] && entity[key]._id === currentEntity._id
        ));
    }

    getEntityIdentifierString(identifiers, entity) {
        return identifiers
            .map(identifier => entity[identifier])
            .filter(identifier => identifier !== "")
            .join(" ");
    }

    componentDidMount() {
        this.fillSelectValues();
    }

    render() {
        return <select className="form-control" id={this.props.id} aria-labelledby={this.props.labelledby}/>;
    }
}

EntityReferenceSelect.propTypes = {
    id: PropTypes.string.isRequired,
    apipath: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    identifiers: PropTypes.array.isRequired,
    optional: PropTypes.bool.isRequired
};
