(function () {
  'use strict';

  // create the angular app
  angular.module('RkyApp', [
    'RkyApp.controllers',
    'RkyApp.directives'
    ]);

  // setup dependency injection
  angular.module('d3', []);
  angular.module('RkyApp.controllers', ['ngMaterial', 'ngMessages']);
  angular.module('RkyApp.directives', ['d3']);


}());