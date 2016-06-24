module.exports = {
    setupEntity: function(appReference, APIpathPrefix, entityName) {
        const path = require('path');
        const pluralize = require('pluralize');

        const modelPath = path.join('../models/', entityName);
        const model = require(modelPath);

        const baseAPI = require('../routes/resourceAPI')(model);

        var decoratedAPI;
        const decoratorName = entityName.toLowerCase() + 'Decorator';
        const decoratorPath = './apiDecorators/' + decoratorName;

        try {
            decoratedAPI = require(decoratorPath)(baseAPI, model);
        } catch (ignored) {
        }

        const routePrefix = APIpathPrefix === undefined ? '' : '/' + APIpathPrefix;
        const route = routePrefix + '/' + pluralize(entityName.toLowerCase()) + '/';

        const APItoUse = decoratedAPI === undefined ? baseAPI : decoratedAPI;
        appReference.use(route, APItoUse);
        console.log('Set up route ' + route);
    }
};
