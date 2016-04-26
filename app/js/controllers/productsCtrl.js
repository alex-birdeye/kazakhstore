'use strict';
/* Controllers */
var phonecatControllers = angular.module('productsController', ['appServices', 'ui.bootstrap']);
var editingcategory;

phonecatControllers.controller('ProductsCtrl', ['$scope', '$http', '$route', 'CategoryService', '$routeParams', function ($scope, $http, $route, CategoryService, $routeParams, $modalInstance) {
    //$route.reload();
    refresh();
    function refresh() {
        $http.get('/products').success(function (response) {
            $scope.products = response;
        });

        //$scope.showModal = false;
        //$scope.showModalEdit = false;
        //$scope.oldcategory = '';
        //$scope.newcategory = '';

    }

    $scope.add = function () {
    };
    $scope.edit = function (oldcategory) {
    };
    $scope.delete = function (category) {
        //$http.delete('/categories/' + category).success(function (response) {
        //    refresh();
        //});
    };

    $scope.$on('refresh', function (event, args) {
        //$route.reload();
        refresh();
        //location.reload();
    });


    $scope.backToCat = function () {
        CategoryService.setLastView('cat');
        $scope.catTemplate = "partials/catTemplate.html";
    }


    //$scope.closeM = function(){
    //    $modalInstance.close();
    //}

}]);

//var ModalInstanceCtrl = function ($scope, $modalInstance) {
//
//    $scope.ok = function () {
//        console.log('var var: '+$scope.VARCONTROLLER);
//        $modalInstance.close('closed result');
//    };
//
//    $scope.cancel = function () {
//        console.log('cancel cancel');
//        $modalInstance.dismiss('cancel');
//    };
//};
//phonecatControllers.controller('ModalInstanceCtrl', ['$scope', function ($scope) {

//$scope.items = items;
//$scope.selected = {
//    item: $scope.items[0]
//};
//
//$scope.ok = function () {
//    $modalInstance.close($scope.selected.item);
//};
//
//$scope.cancel = function () {
//    $modalInstance.dismiss('cancel');
//};

//}]);