app.controller("professorTeamFormCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams", function(profSvc, authSvc, $scope, $location, $window, $routeParams){
  $scope.logout = logout
  $scope.submit = submit;
  $scope.data = [];
  // $scope.data.courseId = $routeParams.courseId;
  $scope.data.name = ''
  $scope.courseId = $routeParams.courseId
  init() //setup the page

  function init(){ //run this function upon changing view
    authSvc.getToken().then(function(res){
      $scope.userInfo = JSON.parse(res);
      profSvc.getCourseStudents($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
        $scope.students = res;
      })
    })
  }

  function submit(){
    var checked = []; //make an array of the students that were checked
    // console.log($scope.students)
    for(x = 0; x < $scope.students.length; x++){
      if($scope.students[x].checked){
        checked.push($scope.students[x]._id)
      }

    }
    $scope.data.selected = checked;

    profSvc.createTeam($routeParams.courseId, $scope.data, $scope.userInfo.access_token).then(function(res){
      $location.path('/professor/course/'+$routeParams.courseId) //return to the course page
    })
  }

  function logout(){
    authSvc.logout().then(function(res){
      $location.path('/login')
    });
  }

}]);
