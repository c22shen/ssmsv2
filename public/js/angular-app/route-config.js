'use strict';

angular
    .module('ssms.app')
    .config(config);

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: "/js/angular-app/tpl/home.html"
                // controller: '/js/angular-app/controller/HomeController'
        });
}
