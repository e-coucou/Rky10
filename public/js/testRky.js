(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('testRky', ['$scope', function($scope){
      $scope.title = "testRky";
      $scope.d3Data = [
        {capteur: "Rky_L", value:12},
        {capteur: "Rky_L", value:13},
        {capteur: "Rky_L", value:19},
        {capteur: "Rky_L", value:34},
        {capteur: "Rky_L", value:55}
      ];
    }]);

}());