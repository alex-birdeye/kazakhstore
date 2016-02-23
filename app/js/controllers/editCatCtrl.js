'use strict';
/* Controllers */
var phonecatControllers = angular.module('editCategoriesController', ['appServices', 'ui.bootstrap']);

phonecatControllers.controller('editCatCtrl', ['$scope', '$http', '$route', 'CategoryService', '$modal', function ($scope, $http, $route, CategoryService, $modal, $modalInstance) {


    $scope.openM = function (category) {
        CategoryService.SetCat(category);
        $modal.open({

            templateUrl: 'partials/editCategory.html',

            controller: ModalInstanceCtrl

            //controllerAs: 'vm',

            //resolve: {

            //people: function () { return vm.people },

            //person: function() { return person; }

            //}

        });
    };
}]);

var ModalInstanceCtrl = function ($scope, $modalInstance, CategoryService, $http, $route) {


    //console.log('catctrl: newcat = ' + $scope.newcategory);
    console.log('editctrl: newcat = ' + CategoryService.GetCat());
    var oldcategory = CategoryService.GetCat();
    $scope.newcategory = oldcategory.name;

    $scope.updCategory = function (newcategory) {
        console.log("newcat: " + newcategory);
        $http.put('/categories/' + oldcategory.name + '/' + newcategory).success(function (response) {
            //$scope.$emit('refresh', 0);
            //location.reload();
        });
        $route.reload();
        $scope.cancel();
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