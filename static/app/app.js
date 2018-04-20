var app = angular.module("app", ["ngRoute","ngResource"]);

app.config(function($routeProvider){
  $routeProvider
  .when("/login",{
      controller: "LoginCtrl",
      templateUrl: "app/partials/mainLogin.html"
  })
  .when("/register", {
    controller: "RegisterCtrl",
    templateUrl: "app/partials/registration.html"
  })
    .when("/student/",{
      controller: "studentHomeCtrl",
      templateUrl: "app/partials/student/home.html"
  })
  .when('/', {redirectTo: "/login"})
  .otherwise({redirectTo: "/login"});

})
