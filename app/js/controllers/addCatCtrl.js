'use strict';
/* Controllers */
var phonecatControllers = angular.module('addCategoriesController', ['appServices', 'ui.bootstrap']);

phonecatControllers.controller('addCatCtrl', ['$scope', '$http', '$route', 'CategoryService', '$modal', function ($scope, $http, $route, CategoryService, $modal, $modalInstance) {



    $scope.addCat = function (category) {
        CategoryService.SetCat(category);
        $modal.open({

            templateUrl: 'partials/addCat.html',

            controller: addCatModalInstanceCtrl

            //controllerAs: 'vm',

            //resolve: {

            //people: function () { return vm.people },

            //person: function() { return person; }

            //}

        });
    };
}]);

var addCatModalInstanceCtrl = function ($scope, $modalInstance, $http, $route) {

    $scope.addCategory = function (category) {
        $http.post('/categories/' + category).success(function (response) {
            $route.reload();
            $scope.cancel()
        });

    };

    $scope.ok = function () {
        console.log('var var: ' + $scope.VARCONTROLLER);
        $modalInstance.close('closed result');
    };

    $scope.cancel = function () {
        console.log('cancel cancel');
        $modalInstance.dismiss('cancel');
    };
};