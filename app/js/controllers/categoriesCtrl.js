'use strict';
/* Controllers */
var phonecatControllers = angular.module('categoriesController', []);

phonecatControllers.controller('CategoriesCtrl', ['$scope', '$http', '$route', '$compile', 'uiGridConstants', '$rootScope', '$uibModal', function ($scope, $http, $route, $uibModal, $compile, uiGridConstants, $rootScope) {
    refresh();
    function refresh() {
        $http.get('/categories').success(function (response) {
            $scope.categories = response;
        });

        $scope.showModal = false;
        $scope.add = function () {
            $scope.showModal = !$scope.showModal;
        };
    }
    $scope.$on('refresh', function(event, args){
        refresh();
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