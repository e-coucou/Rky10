(function () {
  'use strict';

  // create the angular app
  angular.module('RkyApp', [
    'RkyApp.controllers',
    'RkyApp.directives'
    ]);

  // setup dependency injection
  angular.module('d3', []);
  angular.module('RkyApp.controllers', ['ngMaterial', 'ngMessages','ngRoute']
   .config(['$routeProvider',
     function($routeProvider) { 
        
        // Système de routage
        $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .when('/chart', {
            templateUrl: 'chart.html',
            controller: 'httpRky'
        });
    }
  ]);
  angular.module('RkyApp.directives', ['d3']);


}());