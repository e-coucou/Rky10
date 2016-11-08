angular.module("rky10App", ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "list.html",
        controller: "ListController",
        resolve: {
          sensors: function(sensors) {
              return Sensors.getSensors();
          }
        }
      })
  })
  .service("Sensors", function($http) {
    this.getSensors = function() {
      return $http.get("/name").
        then(function(response) {
            return response;
        }, function(response) {
            alert("Error retrieving name of sensors.");
        });
    }
  })
  .controller("ListController", function(sensors, $scope) {
    $scope.sensors = sensors.data;
  });