import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';
import MainController from './main/main.controller';
import graphCanvas from './components/graph/graph.directive.js';
import GraphController from './components/graph/graph.controller.js';
import inputFile from './components/input-file/input-file.directive.js';

angular.module('raspoznovanie', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'restangular', 'ui.router', 'ngMaterial', 'nvd3', 'ngFileSaver'])
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .directive('graphCanvas', graphCanvas)
    .directive('evInputFile', inputFile)
    .controller('MainController', MainController)
    .controller('GraphController', GraphController);
