var app;
var pathPrefix;

module.exports = {
    init: function (appReference, APIpathPrefix) {
        app = appReference;
        pathPrefix = APIpathPrefix;
    },
    setupEntities: function () {
        var path = require('path');
        var pluralize = require('pluralize');

        for (var i = 0; i < arguments.length - 1; i++) {
            var entityName = arguments[i];

            var modelPath = path.join('../models/', entityName);
            var model = require(modelPath);

            var baseAPI = require('../routes/resourceAPI')(model);

            var decoratedAPI;
            var decoratorName = entityName.toLowerCase() + 'Decorator';
            var decoratorPath = './apiDecorators/' + decoratorName;

            try {
                decoratedAPI = require(decoratorPath)(baseAPI, model);
            } catch (ignored) {
            }


            var route = '/' + pluralize(entityName.toLowerCase()) + '/';
            if (pathPrefix !== undefined) {
                route = '/' + pathPrefix + route;
                console.log(route);
            }

            var APItoUse = decoratedAPI === undefined ? baseAPI : decoratedAPI;
            app.use(route, APItoUse);
        }
    }
};