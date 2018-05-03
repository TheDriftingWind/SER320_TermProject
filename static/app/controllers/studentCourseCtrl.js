app.controller("studentCourseCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , "$routeParams", function(studentService, authSvc, $scope, $location, $window, $routeParams){

$scope.userInfo = [];

function init(){

  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);


      //get logged in student info
studentService.getStudentById($scope.userInfo.id).then(function(res){
      $scope.student = res;
    })

      //get selected course info
studentService.getCourseById($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
    $scope.course = res;
});

      //get projects within course
studentService.getProjects($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
    $scope.projects = res;
})

  })

}
    
$scope.logout = function(){
    authSvc.logout();
    $location.path("/");
}

init()



}]);
