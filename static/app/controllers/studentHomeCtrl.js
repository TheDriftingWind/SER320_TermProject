app.controller("studentHomeCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , function(studentService, authSvc, $scope, $location, $window){

$scope.userInfo = [];

function init(){

  authSvc.getToken().then(function(res){
    //console.log(JSON.parse(res))
    $scope.userInfo = JSON.parse(res);
    //console.log($scope.userInfo.id)

    studentService.getStudentById($scope.userInfo.id).then(function(res){
      $scope.student = res;
    });

    studentService.getStudentCourses($scope.userInfo.id, $scope.userInfo.access_token).then(function(res){
      $scope.courses = res;
    });

  })

}

init()



}]);
