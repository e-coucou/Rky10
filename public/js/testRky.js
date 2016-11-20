(function () {
  'use strict';

  angular.module('RkyApp.controllers')
    .controller('selectRky', ['$scope','$http', 'partage', function($scope,$http,partage){
      var url = "/api/v1/list/scale";

      $scope.title = "selectRky";
      $scope.data = {};
$scope.myDate = new Date();
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

    .controller('dateRky', function($scope) {
      $scope.myDate = new Date();
    })
    .config(function($mdDateLocaleProvider) {
      $mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('DD/MM/YYYY') : null;
      };

      $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'DD/MM/YYYY', true);
      return m.isValid() ? m.toDate() : new Date(NaN);
      };      
    })
// --------
// recuperation des valeur depuis MongoDB
//xx(function () {
//xx  'use strict';

//xx  angular.module('RkyApp.controllers')
    .controller('httpRky', ['$scope', '$http','$filter' ,'partage', function($scope, $http, $filter, partage) {
      $scope.title = "Rky - Data Dashboard";
      $scope.partage = partage;
      console.log('httpRky: ' + $scope.partage.model);
        var now = new Date();
        var demain = new Date();
        demain.setDate(demain.getDate() + 1);
      $scope.after = $filter('date')(now,"yyyy/MM/dd");
      $scope.before = $filter('date')(demain,"yyyy/MM/dd");
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
          updateData();
        }

      $scope.$watch(data,calculMoyenne);

      $scope.$watchCollection('partage.capteur',updateData);
      $scope.$watch('after',updateData);
      $scope.$watch('before',updateData);

  }]);
  
 }());