app.controller("professorAddStudentCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){

  setup()

  function setup(){
    profSvc.getAllStudents().then(function(res){
      $scope.students = res;
    })
  }

  function addStudentToCourse(studentId){
    authSvc.getToken().then(function(res){
      $scope.userInfo = JSON.parse(res);
      profSvc.addStudentToCourse(studentId, $routeParams.courseId, $scope.userInfo.access_token).then(function(res){
      })
    })
  }

}]);
