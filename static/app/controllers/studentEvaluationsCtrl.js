app.controller("studentEvaluationsCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , "$routeParams", function(studentService, authSvc, $scope, $location, $window, $routeParams){
    
$scope.userInfo = [];

function init(){

authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);

//gets current course
studentService.getCourseById($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
    $scope.course = res;
});

//gets current project
studentService.getProjectById($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
    $scope.project = res;
})

//gets the team that the student is in
studentService.getStudentTeam($routeParams.courseId, $scope.userInfo.id, $scope.userInfo.access_token).then(function(res){
  if(!res){ //if professor has not placed student in team
    $scope.team={}
    $scope.team.name = "None";
  }
  else{
    $scope.team = res;
    studentService.getStudentGroup($scope.team.students).then(function(roster){
    $scope.roster = roster.filter(function(member){
        //get all members except current student
        return member._id!=$scope.userInfo.id
    });
        studentService.getEvaluationsAsEvaluator($routeParams.courseId$, $scope.userInfo.id, $routeParams.projectId, $scope.roster, $scope.userInfo.access_token).then(function(evaluations){
        $scope.evalsAsEvaluator = evaluations;
        for(index in $scope.evalsAsEvaluator){
           
            //get student object of evaluatee by id
 studentService.getStudentById($scope.evalsAsEvaluator[index].evaluatee).then(function(res){
                if(!res){  
                }
                else{ $scope.evalsAsEvaluator[index].evaluateeInfo=res;
                }
        })
            
        }
        })
        
        //gets evaluations that students have completed about them
         studentService.getEvaluationsAsEvaluatee($routeParams.courseId$, $scope.userInfo.id, $routeParams.projectId, $scope.roster, $scope.userInfo.access_token).then(function(evaluations){
        $scope.evalsAsEvaluatee = evaluations; 
        })
    })
  }
})




  })

}
$scope.logout = function(){
    authSvc.logout();
    $location.path("/");
}

init()

}])