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
    .controller('newRky', ['$scope', '$scope', function($scope, $http){
      $scope.title = "Listes des Capteurs";
      $scope.capteur = { tag:'', info:'', name:'', unit:''};
      $scope.clickButton = function(){
        alert($scope.capteur.name,'/',$scope.capteur.tag);
        console.log($scope.capteur);
      };

            $scope.SendData = function () {
           // use $.param jQuery function to serialize data from JSON 
            var data = $.param({
                fName: $scope.firstName,
                lName: $scope.lastName
            });
        
            var config = {
                headers : {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
                }
            }

            $http.post('/ServerRequest/PostDataResponse', data, config)
            .success(function (data, status, headers, config) {
                $scope.PostDataResponse = data;
            })
            .error(function (data, status, header, config) {
                $scope.ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;
            });
        };

    }]);

}());