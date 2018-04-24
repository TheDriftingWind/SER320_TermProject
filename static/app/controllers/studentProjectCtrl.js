app.controller("studentProjectCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , "$routeParams", function(studentService, authSvc, $scope, $location, $window, $routeParams){

$scope.userInfo = [];

function init(){

  authSvc.getToken().then(function(res){
    //console.log(JSON.parse(res))
    $scope.userInfo = JSON.parse(res);
    //console.log($scope.userInfo.id)
//console.log($routeParams.courseId);

studentService.getStudentById($scope.userInfo.id).then(function(res){
      $scope.student = res;
  //  console.log(res);
    })

studentService.getCourseById($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
    $scope.course = res;
});

studentService.getProjectById($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
    $scope.project = res;
    console.log(res);
})

studentService.getStudentTeam($routeParams.courseId, $scope.userInfo.id, $scope.userInfo.access_token).then(function(res){
  if(!res){
    $scope.team={}
    $scope.team.name = "None";
  }
  else{
    $scope.team = res;
    studentService.getStudentGroup($scope.team.students).then(function(roster){
    $scope.roster = roster;
    console.log(roster);
    })
  }
})




  })

}

init()



}]);
