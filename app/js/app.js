'use strict';

/* App Module */

var app = angular.module('app', [
    //'appControllers',
    'ngRoute',
    'ngResource',
    'categoriesController',
    'userController',
    'appDirectives',
    'appServices',
    'appFilters',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.pagination',
    'ui.grid.autoResize',
    'ui.grid.selection',
    'ui.bootstrap',
    'ui.date',
    'ngCookies',
    'limit',
    'infinite-scroll'
]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            //when('/', {
            //    templateUrl: 'index.html',
            //    controller: 'AppCtrl'
            //})
            when('/categories', {
                templateUrl: 'partials/categories.html',
                controller: 'CategoriesCtrl'
            })
            .otherwise('/');
    }]);
