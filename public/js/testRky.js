(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('testRky', ['$scope', function($scope){
      $scope.title = "testRky";
      $scope.d3Data = [
        {title: "Rky_L", score:12},
        {title: "Rky_L", score:43},
        {title: "Rky_L", score:10},
        {title: "Rky_L", score: 87}
      ];
    }]);

}());