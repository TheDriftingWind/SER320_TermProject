app.controller("studentHomeCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , function(studentService, authSvc, $scope, $location, $window){

studentService.getStudentById('5ad8deee521b44437885b38c').then(function(res){
  $scope.student = res;
});

studentService.getStudentCourses('5ad8deee521b44437885b38c').then(function(res){
    $scope.courses = res;
});


}]);
