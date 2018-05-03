app.controller("professorAddStudentCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){
  $scope.addStudentToCourse = addStudentToCourse
  $scope.logout = logout;
  $scope.courseId = $routeParams.courseId;
  setup()

  function setup(){
    profSvc.getAllStudents().then(function(res){
      $scope.students = res;
    })
    authSvc.getToken().then(function(res){
      $scope.userInfo = JSON.parse(res);
      profSvc.getCourseStudents($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        $scope.existingStudents = res;
        console.log(res);
        var existingIds = [];
        for(x = 0; x < $scope.existingStudents.length; x++){
          existingIds.push($scope.existingStudents[x]._id)
        }
        $scope.existingIds = existingIds;
        // console.log($scope.existingIds)
      })
    })

  }

  function addStudentToCourse(studentId){
    profSvc.addStudentToCourse(studentId, $routeParams.courseId, $scope.userInfo.access_token).then(function(res){
      //console.log(res)
      setup()//re-setup to update the disabled buttons
    })
  }

  function logout(){
    authSvc.logout().then(function(res){
      $location.path('/login')
    });
  }


}]);
