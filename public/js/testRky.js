(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('selectRky', ['$scope','$http', 'partage', function($scope,$http,partage){
      var url = "/api/v1/list/scale";

      $scope.title = "selectRky";
      $scope.data = {};
      $http.get(url).
        then(function(response) {
          $scope.data =  { 
          model: null,
          availableOptions: response.data
          }
          $scope.data.model = $scope.data.availableOptions[3];
        });

      function updateCapteur() {
        partage.capteur = $scope.data.model.scale;
        console.log('update: ' + partage.capteur);
      };

      $scope.$watchCollection('data.model.scale',  updateCapteur);
      
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
    .controller('httpRky', ['$scope', '$http','$filter' ,'partage', function($scope, $http, $filter, partage) {
      $scope.title = "httpRky ... in progress";
      $scope.partage = partage;
      console.log('httpRky: ' + $scope.partage.model);
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
          data.push({ date: value.date, heure: value.heure, value: value.value });
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

      function updateData() {
        urlBase = "/api/v1/search?name="+partage.capteur+"&source=*";
        url = urlBase +"&after="+ $scope.after+"&before=" +$scope.before;
          data.length = 0;
          $scope.nb=0;
          $scope.somme=0.0;
          $scope.moyenne = "waiting for data";
          console.log(url);
          getData();
      }

      $scope.clickButton = function() {
        $scope.jour = $filter('date')(new Date(),"YYYY/MM/DD");
        console.log($scope.jour);
          updateData();
        }

      $scope.$watch(data,calculMoyenne);

      $scope.$watchCollection('partage.capteur',updateData);
      $scope.$watch('after',updateData);
      $scope.$watch('before',updateData);

  }]);
  
 }());