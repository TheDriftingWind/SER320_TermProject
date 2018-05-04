app.controller("professorCourseCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){
  $scope.logout = logout;
  $scope.courseId = $routeParams.courseId;
  setup();

  function setup(){
    authSvc.getToken().then(function(res){
      $scope.userInfo = JSON.parse(res);

      profSvc.getCourseById($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        $scope.course = res;
      })

      profSvc.getProjectsForCourse($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        $scope.projects = res;
      })

      profSvc.getCourseStudents($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        $scope.students = res;
      })

      profSvc.getCourseTeams($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        $scope.teams = res;
      })
    });

  }

  function logout(){
    authSvc.logout().then(function(res){
      $location.path('/login')
    });
  }

}]);
