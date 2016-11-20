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

    .controller('dateRky',['$scope', 'partage' , function($scope,partage) {
        var now = new Date();
        var demain = new Date();
        demain.setDate(demain.getDate() + 1);
      $scope.fromDate = now;
      $scope.toDate = demain;

      function updateDate() {
          partage.dateFrom = $scope.fromDate;
          partage.dateTo = $scope.toDate;
          console.log(partage);
      }
      $scope.$watch('fromDate',updateDate);      
      $scope.$watch('toDate',updateDate);      
    }])
    .config(function($mdDateLocaleProvider) {
      $mdDateLocaleProvider.formatDate = function(date) {
      return date ? moment(date).format('YYYY/MM/DD') : null;
      };

      $mdDateLocaleProvider.parseDate = function(dateString) {
      var m = moment(dateString, 'YYYY/MM/DD', true);
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
        var inc=0;
        $http.get(url)
        .then(function(response){
        angular.forEach(response.data,function(value){
          inc = (inc+1) % $scope.delta;
          console.log(inc);
          if (inc===0) {
          data.push({ date: value.date, heure: value.heure, value: value.value });
          $scope.somme += parseFloat(value.value); 
          $scope.nb += 1;
          $scope.moyenne = ($scope.somme / $scope.nb).toFixed(2);
        }
         });
        });
      }

      function calculMoyenne() {
        $scope.moyenne = $scope.somme / $scope.nb;
//        console.log($scope.somme,$scope.nb,$scope.moyenne);
      }

      $scope.d3Data = data;

      function updateData() {
        console.log('update DATA');
        $scope.after = $filter('date')(partage.dateFrom,"yyyy/MM/dd");
        $scope.before = $filter('date')(partage.dateTo,"yyyy/MM/dd");
        $scope.delta = Math.floor((partage.dateTo-partage.dateFrom)/24/60/60/1000 /7); // 7 on maintien sur 1 semaine
        urlBase = "/api/v1/search?name="+partage.capteur+"&source=*";
        url = urlBase +"&after="+ $scope.after+"&before=" +$scope.before;
          data.length = 0;
          $scope.nb=0;
          $scope.somme=0.0;
          $scope.moyenne = "waiting for data";
          getData();
      }
      function updateDate(){
        $scope.after = $filter('date')(partage.dateFrom,"yyyy/MM/dd");
        $scope.before = $filter('date')(partage.dateTo,"yyyy/MM/dd");
        console.log('update picker : ', $scope.after, $scope.before);
      }

      $scope.clickButton = function() {
          updateData();
        }

      $scope.$watch(data,calculMoyenne);

      $scope.$watchCollection('partage',updateData);
//      $scope.$watchCollection('partage.dateFrom',updateDate);
//      $scope.$watchCollection('partage.dateTo',updateDate);
//      $scope.$watch('after',updateData);
//      $scope.$watch('before',updateData);


  }]);
  
 }());