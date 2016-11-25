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
    .controller('newRky', ['$scope', '$http', function($scope, $http){
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
                    'Content-Type': 'application/json;'
                }
            }

            $http.post('/api/v1/scale', data, config)
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

    }])

  .service("Sensors", function($http) {
    this.getSensors = function() {
      return $http.get("/api/v1/name").
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error retrieving name of sensors.");
        });
    }
  })

    .controller('listCapteur', function($scope, $http) {
        $scope.sensors = sensors.data;
    });

}());