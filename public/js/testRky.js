(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('testRky', ['$scope', function($scope){
      $scope.title = "testRky";
      $scope.d3Data = [
        {name: "Rky_L", score:12},
        {name: "Rky_L", score:43},
        {name: "Rky_L", score:10},
        {name: "Rky_L", score: 87}
      ];
    }]);

}());