(function () {
  'use strict';

  // create the angular app
  angular.module('RkyApp', [
    'RkyApp.controllers',
    'RkyApp.directives'
    ]);

  // setup dependency injection
  angular.module('d3', []);
  angular.module('RkyApp.controllers', []);
//  angular.module('myApp.directives', ['d3']);


}());