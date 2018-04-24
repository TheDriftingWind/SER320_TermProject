app.controller("studentCourseCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , "$routeParams", function(studentService, authSvc, $scope, $location, $window, $routeParams){

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

studentService.getProjects($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
    $scope.projects = res;
    console.log(res);
})

  })

}

init()



}]);
