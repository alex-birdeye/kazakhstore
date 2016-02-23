'use strict';

/* Services */

var phonecatServices = angular.module('appServices', ['ngResource']);
phonecatServices.factory('CategoryService', [function () {
    var service = {};

    service.GetCat = GetCat;
    service.SetCat = SetCat;
    service.GetSubCat = GetSubCat;
    service.SetSubCat = SetSubCat;
    service.setLastView = setLastView;
    service.getLastView = getLastView;
    //service.GetByUsername = GetByUsername;
    //service.Create = Create;
    //service.Update = Update;
    //service.Delete = Delete;
    var cc;
    var currSubCat;
    var lastView;

    return service;

    function GetSubCat() {
        return currSubCat;
    }

    function SetSubCat(cat) {
        return currSubCat = cat;
    }

    function GetCat() {
        return cc;
    }

    function SetCat(cat) {
        return cc = cat;
    }

    function setLastView() {
        return lastView;
    }

    function getLastView(lv) {
        return lastView = lv;
    }
}]);