app.controller("professorCourseCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){

  $scope.courseId = $routeParams.courseId;
  setup();

  function setup(){
    authSvc.getToken().then(function(res){
      $scope.userInfo = JSON.parse(res);

      profSvc.getCourseById($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        console.log(res)
        $scope.course = res;
      })

      profSvc.getProjectsForCourse($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        console.log(res);
        $scope.projects = res;
      })

      profSvc.getCourseStudents($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        console.log(res)
        $scope.students = res;
      })

    });

  }

}]);
