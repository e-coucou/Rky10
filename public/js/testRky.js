(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('selectRky', ['$scope','$http', 'partage', function($scope,$http,partage){
      var url = "/api/v1/list/scale";

      $scope.title = "selectRky";
      $scope.data= {};
      $http.get(url).
        then(function(response) {
          $scope.data =  { 
          model: null,
          availableOptions: response.data
          }
          console.log($scope.data); 
        });

      function updateCapteur() {
        partage.capteur = $scope.data.model;
        console.log(partage);
      };

      $scope.$watch($scope.data,  updateCapteur);
      
}])

    .service('partage', function() {
      var Data = {
        capteur: '',
        dateFrom: '',
        dateTo: ''
      };
      return Data;
    })
//xx  } ());

// --------
// recuperation des valeur depuis MongoDB
//xx(function () {
//xx  'use strict';

//xx  angular.module('RkyApp.controllers')
    .controller('httpRky', ['$scope', '$http', 'partage', function($scope, $http, partage){
      $scope.title = "httpRky ... in progress";
      $scope.partage = partage;
      console.log($scope.partage);
      $scope.after = "2016/11/17";
      $scope.before = "2016/11/18";
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
          console.log($scope.data);
          getData();
        }

      $scope.$watch(data,calculMoyenne);

  }]);
  
 }());