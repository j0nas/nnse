import React from "react";
import {Link} from "react-router";

export default class EntityFormatter {
    static formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }

    static createForeignEntityLink(identifierFields, endpoint, entity) {
        const sanity = identifierFields && endpoint && entity;
        if (!sanity) {
            return;
        }

        return (
            <Link to={endpoint + "/" + entity._id}>
                {identifierFields
                    .filter(field => entity[field])
                    .map(field => entity[field] + " ")}
            </Link>
        );
    }

    static processTypedEntity(entity, entityObject) {
        switch (entityObject.type) {
        case "date":
            return this.formatDate(entity);
        case "entity_reference":
            return this.createForeignEntityLink(entityObject.identifiers, entityObject.endpoint, entity);
        default:
            return entity;
        }
    }

    static formatEntities(entities, entityObject, apiPath) {
        const result = [];

        entities.forEach((entity, index) => {
            result[index] = {
                _id: apiPath ? <Link to={apiPath + "/" + entity._id} key={entity._id}>{entity._id}</Link> : entity._id
            };

            Object.keys(entityObject).forEach(key => {
                result[index][key] = this.processTypedEntity(entity[key], entityObject[key]);
            });
        });

        return result;
    }
}
