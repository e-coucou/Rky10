(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('testRky', ['$scope', function($scope){
      $scope.title = "testRky";
      $scope.d3Data = [
        {capteur: "Rky_L", score:10},
        {capteur: "Rky_L", score: 87}
      ];
    }]);

}());


(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('httpRky', ['$scope', '$http', function($scope, $http){
      $scope.title = "httpRky";
      var url = "/api/v1/list/scale";
      $http.get(url)
        .then(function(response){
        });
        angular.forEach(response.data,function(value){
          console.log(value.scale);
        });
    }]);

}());