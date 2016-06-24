import React, {Component, PropTypes} from "react";

export default class EntityReferenceSelect extends Component {

    fillSelectValues() {
        const selectElement = document.getElementById(this.props.id);

        fetch("/api" + this.props.apipath)
            .then(res => res.json())
            .then(currentRouteEntities => {
                fetch("/api" + this.props.endpoint)
                    .then(foreignEntities => foreignEntities.json())
                    .then(foreignEntities => {
                        foreignEntities.forEach(foreignEntity => {
                            const belongsToEditedEntity =
                                this.props.entity && foreignEntity._id === this.props.entity[this.props.id];

                            if (belongsToEditedEntity || !this.entityIsAssociated(foreignEntity, currentRouteEntities)) {
                                const identifierString = this.getEntityIdentifierString(this.props.identifiers, foreignEntity);
                                this.addSelectElementOption(identifierString, foreignEntity._id, selectElement, belongsToEditedEntity);
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

    entityIsAssociated(entity, entityCollection) {
        for (let i = 0; i < entityCollection.length; i++) {
            const keys = Object.keys(entityCollection[i]);
            for (let j = 0; j < keys.length; j++) {
                if (entityCollection[i][keys[j]] && entityCollection[i][keys[j]]._id === entity._id) {
                    return true;
                }
            }
        }

        return false;
    }

    getEntityIdentifierString(identifiers, entity) {
        let identifiersString = "";
        let addedFirstIdentifier = false;
        identifiers.forEach(identifier => {
            if (entity[identifier]) {
                if (addedFirstIdentifier) {
                    identifiersString += " ";
                } else {
                    addedFirstIdentifier = true;
                }

                identifiersString += entity[identifier];
            }
        });

        return identifiersString;
    }

    componentDidMount() {
        this.fillSelectValues();
    }

    render() {
        return <select className="form-control" id={this.props.id}/>;
    }
}

EntityReferenceSelect.propTypes = {
    id: PropTypes.string.isRequired,
    apipath: PropTypes.string.isRequired,
    endpoint: PropTypes.string.isRequired,
    identifiers: PropTypes.array.isRequired
};
