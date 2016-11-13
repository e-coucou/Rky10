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

// --------
// recuperation des valeur depuis MongoDB
(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('httpRky', ['$scope', '$http', function($scope, $http){
      $scope.title = "httpRky ... in progress";
      var url1 = "/api/v1/list/scale";
      var url ="/api/v1/search?name=Rky_H&source=*&after=2016/11/13";
      var data = [];
      $http.get(url)
        .then(function(response){
        angular.forEach(response.data,function(value){
          data.push({ capteur: value.heure, score: value.value }); 
        });
      });
      $scope.d3Data = data;
    }]);
}());