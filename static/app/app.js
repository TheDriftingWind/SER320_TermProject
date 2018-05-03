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
  //Studet Routes
  .when("/student",{
    controller: "studentHomeCtrl",
    templateUrl: "app/partials/student/home.html"
  })
  .when("/student/course/:courseId", {
    controller: "studentCourseCtrl",
    templateUrl: "app/partials/student/course.html"
  })
  .when("/student/course/:courseId/project/:projectId", {
    controller: "studentProjectCtrl",
    templateUrl: "app/partials/student/project.html"
  })
.when("/student/course/:courseId/project/:projectId/evaluations", {
    controller: "studentEvaluationsCtrl",
    templateUrl: "app/partials/student/session.html"
  })

.when("/student/course/:courseId/project/:projectId/evaluations/fill/:evaluationId", {
    controller: "studentEvalFormCtrl",
    templateUrl: "app/partials/student/student_evaluation_form.html"
  })

  .when("/student/course/:courseId/project/:projectId/evaluations/view/:index/:evaluationId", {
      controller: "studentViewEvalCtrl",
      templateUrl: "app/partials/student/s_evaluation_view.html"
    })
  //Professor Routes
  .when("/professor", {
    controller: "professorHomeCtrl",
    templateUrl: "app/partials/prof/p_home.html"
  })
  .when('/professor/course/:courseId', {
    controller: "professorCourseCtrl",
    templateUrl: "app/partials/prof/p_course.html"
  })
  .when('/professor/course/:courseId/projectForm', {
    controller: "professorProjectFormCtrl",
    templateUrl: "app/partials/prof/p_project_form.html"
  })
  .when('/professor/course/:courseId/addStudents', {
    controller: "professorAddStudentCtrl",
    templateUrl: "app/partials/prof/p_student_lookup.html"
  })
  .when('/professor/course/:courseId/teamForm',{
    controller: "professorTeamFormCtrl",
    templateUrl: "app/partials/prof/p_team_form.html"
  })
  .when("/professor/createCourse", {
    controller: "createCourseCtrl",
    templateUrl: "app/partials/prof/p_course_form.html"
  })
  .when("/professor/course/:courseId/project/:projectId", {
    controller: "professorProjectCtrl",
    templateUrl: "app/partials/prof/p_project.html"
  })
  .when("/professor/course/:courseId/project/:projectId/createEvaluation", {
    controller: "professorEvaluationFormCtrl",
    templateUrl: "app/partials/prof/p_evaluation_form.html"
  })
  .when("/professor/course/:courseId/team/:teamId", { //View specific team
    controller: "professorViewTeamCtrl",
    templateUrl: "app/partials/prof/p_team.html"
  })
  .when('/professor/course/:courseId/project/:projectId/evaluation/:evaluationId', {
    controller: "professorViewEvaluationCtrl",
    templateUrl: "app/partials/prof/p_evaluation_view.html"
  })
  .when('/', {redirectTo: "/login"})
  //.otherwise({redirectTo: "/login"});

})
