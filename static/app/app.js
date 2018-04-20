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
  .when("/student",{
    controller: "studentHomeCtrl",
    templateUrl: "app/partials/student/home.html"
  })
  .when("/professor", {
    controller: "professorHomeCtrl",
    templateUrl: "app/partials/prof/p_home.html"
  })
  // .when("professor/createCourse", {
  //   controller: "createCourseCtrl",
  //   templateUrl: "app/partials/prof/"
  // })
  .when('/', {redirectTo: "/login"})
  .otherwise({redirectTo: "/login"});

})
