//'use strict';
///* Controllers */
//var phonecatControllers = angular.module('userController', []);
//
//phonecatControllers.controller('UserController', ['UserService', '$scope', '$http', '$compile', '$route', function (UserService, $scope, $http, $compile, $route) {
//    $http.get('api/users').success(function (response) {
//        $scope.users = response;
//    });
//    $scope.add = function () {
//        var elem = document.getElementsByClassName('user');
//        console.log('elem: ' + elem.length);
//        var e1 = angular.element(elem.item(elem.length - 1));
//        e1.after($compile("<div class='row'>" +
//        "<div class='col-md-2'>" +
//        "<label>First name</label>" +
//        "<input type='text' ng-model='cfname'>" +
//        "</div><div class='col-md-2'>" +
//        "<label>Last name</label>" +
//        "<input type='text' ng-model='clname'>" +
//        "</div><div class='col-md-2'>" +
//        "<label>Username</label>" +
//        "<input type='text' ng-model='cuname' required>" +
//        "</div><div class='col-md-2'>" +
//        "<label>Password</label>" +
//        "<input type='text' ng-model='cpass'>" +
//        "</div>" +
//        "<div class='col-md-2 user-btns'><button class='btn-primary' ng-click='create(cfname , clname, cuname, cpass)'>Create</button>" +
//        "<button class='btn-danger' ng-click='delete(uname)'>Delete</button></div></div>")($scope));
//    };
//
//    $scope.create = function (fn, ln, un, up) {
//        var userStr = '{\"firstName\": \"' + fn + '\", ' + '\"lastName\": \"' + ln + '\", ' + '\"username\": \"' + un + '\", ' + '\"password\": \"' + up + '\"' + '}';
//        console.log(userStr);
//        var user = JSON.parse(userStr);
//        console.log(user);
//        UserService.Create(user, function (response) {
//            if (response.success) {
//                alert('User created !');
//                $location.path('/login');
//            } else {
//                alert('Creation failed: ' + response.message);
//                vm.dataLoading = false;
//            }
//        });
//        $route.reload();
//    }
//
//    $scope.delete = function (username) {
//        $http.delete('/api/users/' + username).success(function (response) {
//            alert('User ' + username + ' deleted !')
//        });
//        $route.reload();
//    };
//
//    $scope.update = function (fname, lname, uname, pass) {
//
//        //var fname = document.getElementById("fname").value
//        //var lname = document.getElementById("lname").value
//        //var uname = document.getElementById("uname").value
//        //var pass = document.getElementById("pass").value
//        console.log('upd: ' + fname + '/' + lname + '/' + uname + '/' + pass);
//        $http.put('/api/users/' + fname + '/' + lname + '/' + uname + '/' + pass, function (response) {
//
//        });
//        $route.reload();
//    };
//}]);