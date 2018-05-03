app.controller("studentProjectCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , "$routeParams", function(studentService, authSvc, $scope, $location, $window, $routeParams){

$scope.userInfo = [];

function init(){

  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);
    
studentService.getCourseById($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
    $scope.course = res;
});
      
//get the current project
studentService.getProjectById($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
    $scope.project = res;
})

//get the students team
studentService.getStudentTeam($routeParams.courseId, $scope.userInfo.id, $scope.userInfo.access_token).then(function(res){
  if(!res){ //if student is not set to a team
    $scope.team={}
    $scope.team.name = "None";
  }
  else{ // if student is set to a team
    $scope.team = res;
    studentService.getStudentGroup($scope.team.students).then(function(roster){
    $scope.roster = roster;
    
        //gets the evaluations that the student is the evaluator for
    studentService.getEvaluationsAsEvaluator($routeParams.courseId$, $scope.userInfo.id, $routeParams.projectId, $scope.roster, $scope.userInfo.access_token).then(function(evaluations){
        if(evaluations.length>0){ //checks if the professor started the evaluation session
            $scope.evalsCreated = true;
        }
        })
    })
  }
})

  })

}
    
$scope.logout = function(){
    authSvc.logout(); //clears token
    $location.path("/"); //sends user back to login page
}

init()



}]);
