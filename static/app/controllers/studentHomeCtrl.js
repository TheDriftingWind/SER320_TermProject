app.controller("studentHomeCtrl", ["studentService", "profSvc", "authSvc", "$scope", "$location", "$window" , function(studentService, profSvc, authSvc, $scope, $location, $window){

$scope.userInfo = [];

function init(){

  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);

    studentService.getStudentById($scope.userInfo.id).then(function(res){
      $scope.student = res;
    });

      //gets all the courses that a student is enrolled in
    studentService.getStudentCourses($scope.userInfo.id, $scope.userInfo.access_token).then(function(res){
      $scope.courses = res;
        for(index in $scope.courses){
            if(!$scope.courses[index].professor){ //if the course does not have a set professor
                $scope.courses[index].professorInfo={}
            }
            else{
                //gets professors information (name)
            profSvc.getProfessorById($scope.courses[index].professor).then(function(res){
                if(!res){  
                }
                else{
              $scope.courses[index].professorInfo=res;
                }
            })
            }
        }
    });
  })

}
$scope.logout = function(){
    authSvc.logout();//clears token
    $location.path("/");//sends user to login page
}

init()



}]);
