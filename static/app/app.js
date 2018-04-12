var app = angular.module("app", ["ngRoute","ngResource"]);

app.config(function($routeProvider){
  $routeProvider
  .when("/",{
      controller: "HomeCtrl",
      templateUrl: "app/partials/mainLogin.html"
  })
  .otherwise({});

})
