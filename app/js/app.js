'use strict';

/* App Module */

var app = angular.module('app', [
    //'appControllers',
    'ngRoute',
    'ngResource',
    'categoriesController',
    'productsController',
    'subCategoriesController',
    'appDirectives',
    'appServices',
    'appFilters',
    'addSubCategoriesController',
    'editSubCategoriesController',
    'ui.grid.pagination',
    'ui.grid.autoResize',
    'ui.grid.selection',
    'ui.bootstrap',
    'ui.date',
    'ngCookies',
    'addCategoriesController',
    'editCategoriesController'
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
            .when('/products', {
                templateUrl: 'partials/products.html',
                controller: 'ProductsCtrl'
            })
            .when('/categories/:catorsubcat/', {
                templateUrl: 'partials/categories.html',
                controller: 'CategoriesCtrl'
            })
            .when('/categories/:catorsubcat/:catname', {
                templateUrl: 'partials/categories.html',
                controller: 'SubCategoriesCtrl'
            })
            .otherwise('/');
    }]);
