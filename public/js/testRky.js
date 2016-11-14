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
      $scope.date = "2016/11/01";
      var url1 = "/api/v1/list/scale";
      var urlBase ="/api/v1/search?name=Rky_P&source=*&after=";
      var url = urlBase + $scope.date;
      var data = [];

      $http.get(url)
        .then(function(response){
        angular.forEach(response.data,function(value){
          data.push({ capteur: value.heure, score: value.value }); 
        });
      });

      $scope.d3Data = data;

      $scope.clickButton = function() {
          url = urlBase + $scope.date;
          console.log(url);
        }


  }]);
  
 }());