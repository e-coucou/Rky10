(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('testRky', ['$scope', function($scope){
      $scope.title = "testRky";
      $scope.d3Data = [
        {sensors: "Rky_L", value:12},
        {sensors: "Rky_L", value:13},
        {sensors: "Rky_L", value:19},
        {sensors: "Rky_L", value:34},
        {sensors: "Rky_L", value:55}
      ];
      $scope.d3OnClick = function(item){
        alert(item.sensors);
      };
    }]);

}());