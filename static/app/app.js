var app = angular.module("app", ["ngRoute","ngResource"]);

app.config(function($routeProvider){
  $routeProvider
  .when("/",{
      controller: "HomeCtrl",
      templateUrl: "app/partials/mainLogin.html"
  })
  .when("/register", {
    controller: "RegisterCtrl",
    templateUrl: "app/partials/registration.html"
  })
  .otherwise({
    
  });

})
