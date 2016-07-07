module.exports = {
    setupEntity: function(appReference, APIpathPrefix, entityName) {
        const baseRouter = require('express').Router();
        const path = require('path');
        const pluralize = require('pluralize');

        const modelPath = path.join('../models/', entityName);
        const model = require(modelPath);

        var decorateRouter;
        const decoratorName = entityName.toLowerCase() + 'Decorator';
        const decoratorPath = './apiDecorators/' + decoratorName;

        try {
            decorateRouter = require(decoratorPath)(baseRouter, model);
        } catch (ignored) {
        }

        const router = decorateRouter ? decorateRouter : baseRouter;
        const baseAPI = require('../routes/resourceAPI')(model, router);

        const routePrefix = APIpathPrefix === undefined ? '' : '/' + APIpathPrefix;
        const route = routePrefix + '/' + pluralize(entityName.toLowerCase()) + '/';

        appReference.use(route, baseAPI);
        console.log('Set up route ' + route);
    }
};
