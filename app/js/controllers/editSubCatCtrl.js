'use strict';
/* Controllers */
var phonecatControllers = angular.module('editSubCategoriesController', ['appServices', 'ui.bootstrap']);

phonecatControllers.controller('editSubCatCtrl', ['$scope', '$http', '$route', 'CategoryService', '$modal', function ($scope, $http, $route, CategoryService, $modal, $modalInstance) {


    $scope.openM = function (category, subcategory) {
        CategoryService.SetCat(category);
        CategoryService.SetSubCat(subcategory);
        $modal.open({

            templateUrl: 'partials/editSubCategory.html',

            controller: editSubCatModalInstanceCtrl

            //controllerAs: 'vm',

            //resolve: {

            //people: function () { return vm.people },

            //person: function() { return person; }

            //}

        });
    };
}]);

var editSubCatModalInstanceCtrl = function ($scope, $modalInstance, CategoryService, $http, $route) {

    //console.log('catctrl: newcat = ' + $scope.newcategory);
    console.log('editctrl: newcat = ' + CategoryService.GetCat());
    var oldsubcategory = CategoryService.GetSubCat();
    var currCat = CategoryService.GetCat();
    $scope.newsubcategory = oldsubcategory;

    $scope.updSubCategory = function (newsubcategory) {

        console.log("oldsubcat: " + oldsubcategory);
        console.log("newsubcat: " + newsubcategory);
        console.log("currcat: " + currCat.name);
        $http.put('/subcategories/' + currCat.name + '/' + oldsubcategory + '/' + newsubcategory).success(function (response) {
            $route.reload();
            $scope.cancel();
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