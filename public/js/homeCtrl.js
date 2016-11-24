(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('homeCtrl', ['$scope', function($scope){
      $scope.title = "Home PAGE";
      
      $scope.d3OnClick = function(item){
        alert(item.name);
      };
    }]);

}());