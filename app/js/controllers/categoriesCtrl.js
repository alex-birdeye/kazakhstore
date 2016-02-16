'use strict';
/* Controllers */
var phonecatControllers = angular.module('categoriesController', []);
var editingcategory;

phonecatControllers.controller('CategoriesCtrl', ['$scope', '$http', '$route', 'uiGridConstants', '$rootScope', '$uibModal', function ($scope, $http, $route, $uibModal, uiGridConstants, $rootScope) {
    //$route.reload();
    refresh();
    function refresh() {
        $http.get('/categories').success(function (response) {
            $scope.categories = response;
        });

        $scope.showModal = false;
        $scope.showModalEdit = false;
        //$scope.oldcategory = '';
        //$scope.newcategory = '';

    }

    $scope.add = function () {
        $scope.showModal = !$scope.showModal;
    };
    $scope.edit = function (oldcategory) {
        $scope.oldcategory = oldcategory;
        $scope.newcategory = oldcategory;
        console.log('catctrl: newcat = ' + $scope.newcategory);
        $scope.showModalEdit = !$scope.showModalEdit;
    };
    $scope.delete = function (category) {
        $http.delete('/categories/' + category).success(function (response) {
            refresh();
        });
    };

    $scope.$on('refresh', function (event, args) {
        //$route.reload();
        refresh();
        //location.reload();
    });
}]);

phonecatControllers.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});