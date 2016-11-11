(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('testRky', ['$scope', function($scope){
      $scope.title = "testRky";
      $scope.d3Data = [
        {capteur: "Rky_L", score:12},
        {capteur: "Rky_L", score:43},
        {capteur: "Rky_L", score:10},
        {capteur: "Rky_L", score: 87}
      ];
    }]);

}());