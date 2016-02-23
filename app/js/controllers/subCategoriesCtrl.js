'use strict';
/* Controllers */
var phonecatControllers = angular.module('subCategoriesController', ['appServices', 'ui.bootstrap']);
var editingcategory;

phonecatControllers.controller('SubCategoriesCtrl', ['$scope', '$http', '$route', 'CategoryService', '$routeParams', function ($scope, $http, $route, CategoryService, $routeParams, $modalInstance) {
    //$route.reload();
    refresh();
    function refresh() {
        var category = $routeParams.catname;
        $http.get('/categories/' + category).success(function (response) {
            console.log(response[0]);
            $scope.currCat = response[0];
            $scope.catTemplate = "partials/subCatTemplate.html";
        });
    }

    $scope.add = function () {
        //$scope.showModal = !$scope.showModal;
    };
    $scope.edit = function (oldcategory) {
        //$scope.oldcategory = oldcategory;
        //CategoryService.SetCat(oldcategory);
        //console.log('catctrl: newcat = ' + $scope.newcategory);
        //console.log('catctrl: newcat = ' + CategoryService.GetCat());
        //$scope.oldcategory = CategoryService.GetCat();
        //$scope.newcategory = CategoryService.GetCat();
        //$scope.showModalEdit = !$scope.showModalEdit;
    };
    $scope.delete = function (subcategory) {
        $http.delete('/subcategories/' + $scope.currCat.name + '/' + subcategory).success(function (response) {
            refresh();
        });
    };

    $scope.$on('refresh', function (event, args) {
        //$route.reload();
        refresh();
        //location.reload();
    });

    //var lastView = CategoryService.getLastView();
    //if (lastView == null || lastView == 'cat')
    //$scope.catTemplate = "partials/" + $routeParams.catorsubcat + ".html";
    //$scope.openSubCat = function (category) {
    //    //CategoryService.SetCat(category);
    //    $http.get('/categories/' + category.name).success(function (response) {
    //        console.log(response[0]);
    //        $scope.currCat = response[0];
    //        $scope.catTemplate = "partials/subCatTemplate.html";
    //    });
    //}

    //$scope.backToCat = function () {
        //CategoryService.setLastView('cat');
        //$scope.catTemplate = "partials/catTemplate.html";
    //}


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