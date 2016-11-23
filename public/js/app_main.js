angular.module("rky10App", ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "index.html",
        controller: "testRky";
        }
      )
  })
  .controller("ListController", function(sensors, $scope) {
    $scope.sensors = sensors.data;
  });