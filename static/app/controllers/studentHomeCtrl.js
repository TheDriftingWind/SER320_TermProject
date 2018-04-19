app.controller("studentHomeCtrl", ["studentService", "$scope", "$location", "$window", 'autoSvc' , function(studentService, $scope, $location, $window, authSvc){

$scope.student = studentService.getStudentById(authSvc.getToken.id);

studentService.getStudentCourses(authSvc.getToken.id).then(function(res){
    $scope.courses = res;
});


}]);
