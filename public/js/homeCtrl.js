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




(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('newRky', ['$scope', function($scope){
      $scope.title = "Listes des Capteurs";
      var capteur = { tag:'', info:'', name:'', unit:''};
      $scope.clickButton = function(item){
        alert(item.name,'/',item.tag);
      };
    }]);

}());