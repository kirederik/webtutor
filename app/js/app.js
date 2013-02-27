'use strict';


// Declare app level module which depends on filters, and services

var webtutor = angular.module('webtutor', ['webtutor.filters', 'webtutor.services', 'webtutor.directives'])

webtutor.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: MainCtrl});
    $routeProvider.when('/start-arit', {templateUrl: 'partials/expressions.html', controller: ExpressionsCtrl});
    $routeProvider.when('/start-derivative', {templateUrl: 'partials/derivative.html', controller: ExpressionsCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
}]);
