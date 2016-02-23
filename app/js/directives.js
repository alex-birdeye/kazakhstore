'use strict';

/* Directives */
var phonecatDirectives = angular.module('appDirectives', []);

phonecatDirectives.directive('modal', function () {
    return {
        templateUrl: 'partials/newcategory.html',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        controller: ['$scope', '$http', function ($scope, $http) {
            //$scope.addCategory = function (category) {
            //    $http.post('/categories/' + category).success(function (response) {
            //        $scope.kategories = response[0].keywords;
            //        $scope.$emit('refresh', 0);
            //    });
            //};
        }],
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

phonecatDirectives.directive('modaledit', function () {
    return {
        templateUrl: 'partials/editSubCategory.html',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        controller: ['$scope', '$http', 'CategoryService', '$route', function ($scope, $http, CategoryService, $route) {
            console.log('modedit: newcat = ' + $scope.newcategory);
            //$scope.newcategory = CategoryService.GetCat();
            //$scope.updCategory = function (newcategory) {
            //    $http.put('/categories/' + CategoryService.GetCat() + '/' + newcategory).success(function (response) {
            //        //$scope.$emit('refresh', 0);
            //        location.reload();
            //    });
            //    //$route.reload();
            //};
        }],
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});