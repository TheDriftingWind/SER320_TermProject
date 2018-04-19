var app = angular.module("app", ["ngRoute","ngResource"]);

app.config(function($routeProvider){
  $routeProvider
  .when("/",{
      controller: "LoginCtrl",
      templateUrl: "app/partials/mainLogin.html"
  })
  .when("/register", {
    controller: "RegisterCtrl",
    templateUrl: "app/partials/registration.html"
  })
    .when("/student/:studentId",{
      controller: "studentHomeCtrl",
      templateUrl: "app/partials/student/home.html"
  })
  .otherwise({

  });

})
