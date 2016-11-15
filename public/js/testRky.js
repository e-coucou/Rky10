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
      $scope.after = "2016/11/01";
      $scope.before = "2016/11/02";
      $scope.moyenne = 0.0;
      $scope.nb = 0;
      var url1 = "/api/v1/list/scale";
      var urlBase ="/api/v1/search?name=Rky_P&source=*";
      var url = urlBase + $scope.date;
      var data = [];

      function getData () {
        $http.get(url)
        .then(function(response){
        angular.forEach(response.data,function(value){
          data.push({ capteur: value.heure, score: value.value });
          $scope.moyenne = $scope.moyenne + parseFloat(value.value); 
          console.log(parseFloat(value.value),$scope.moyenne);
          $scope.nb = $scope.nb + 1;
         });
       });
       $scope.moyenne = $scope.moyenne / $scope.nb;
       console.log($scope);
      }

      $scope.d3Data = data;

      $scope.clickButton = function() {
          url = urlBase +"&after="+ $scope.after+"&before=" +$scope.before;
          data.length = 0;
          console.log(url);
          getData();
        }


  }]);
  
 }());