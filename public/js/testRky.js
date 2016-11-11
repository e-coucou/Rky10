(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('testRky', ['$scope', function($scope){
      $scope.title = "testRky";
      $scope.d3Data = [
        {capteur: "Rky_L", value:12},
        {capteur: "Rky_T", value:13},
        {capteur: "Rky_P", value:19},
        {capteur: "Rky_Lu", value:34},
        {capteur: "Rky_Ya", value:55}
      ];
    }]);

}());