(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('selectRky', ['$scope','$http', function($scope,$http){
      var url = "/api/v1/list/scale";
      var liste = getScale();
      console.log(liste);
      $scope.title = "selectRky";
      $scope.data =  { 
        model: null,
        availableOptions: [ {_id: '1', scale: 'liste'}, {_id: '2', scale: 'liste_2'} ]
      };

      function getScale() { 
        return   $http.get("/api/v1/list/scale")
        .then(function(response) {
            console.log(response);
            return response;
        }, function(response) {
            alert("Error retrieving name of sensors.");
        });
      }

    console.log($scope.data);
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
      $scope.somme = 0.0;
      $scope.nb = 0;
      var urlBase ="/api/v1/search?name=Rky_P&source=*";
      var url = urlBase + $scope.date;
      var data = [];

      function getData () {
        $http.get(url)
        .then(function(response){
        angular.forEach(response.data,function(value){
          data.push({ capteur: value.heure, score: value.value });
          $scope.somme += parseFloat(value.value); 
          $scope.nb += 1;
          $scope.moyenne = ($scope.somme / $scope.nb).toFixed(2);
         });
       });
      }

      function calculMoyenne() {
        $scope.moyenne = $scope.somme / $scope.nb;
        console.log($scope.somme,$scope.nb,$scope.moyenne);
      }

      $scope.d3Data = data;

      $scope.clickButton = function() {
          url = urlBase +"&after="+ $scope.after+"&before=" +$scope.before;
          data.length = 0;
          $scope.nb=0;
          $scope.somme=0.0;
          $scope.moyenne = "waiting for data";
          console.log(url);
          getData();
        }

      $scope.$watch(data,calculMoyenne);

  }]);
  
 }());