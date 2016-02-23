'use strict';
/* Controllers */
var phonecatControllers = angular.module('addSubCategoriesController', ['appServices', 'ui.bootstrap']);

phonecatControllers.controller('addSubCatCtrl', ['$scope', '$http', '$route', 'CategoryService', '$modal', function ($scope, $http, $route, CategoryService, $modal, $modalInstance) {



    $scope.addSubCat = function (category) {
        CategoryService.SetCat(category);
        $modal.open({

            templateUrl: 'partials/addSubCat.html',

            controller: addSubCatModalInstanceCtrl

            //controllerAs: 'vm',

            //resolve: {

            //people: function () { return vm.people },

            //person: function() { return person; }

            //}

        });
    };
}]);

var addSubCatModalInstanceCtrl = function ($scope, $modalInstance, $http, $route, CategoryService) {

    $scope.addSubCategory = function (subcategory) {
        var category = CategoryService.GetCat();
        console.log("add subcst to: " + category.name);
        $http.post('/subcategories/' + category.name + '/' + subcategory).success(function (response) {
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