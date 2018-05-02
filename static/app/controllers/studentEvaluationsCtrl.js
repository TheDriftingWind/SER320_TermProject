app.controller("studentEvaluationsCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , "$routeParams", function(studentService, authSvc, $scope, $location, $window, $routeParams){
    
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
})

studentService.getStudentTeam($routeParams.courseId, $scope.userInfo.id, $scope.userInfo.access_token).then(function(res){
  if(!res){
    $scope.team={}
    $scope.team.name = "None";
  }
  else{
    $scope.team = res;
    studentService.getStudentGroup($scope.team.students).then(function(roster){
    $scope.roster = roster.filter(function(member){
        console.log(member)
        //get all members except current student
        return member._id!=$scope.userInfo.id
    });
       console.log("here") 
        studentService.getEvalStatuses($routeParams.courseId$, $scope.userInfo.id, $routeParams.projectId, $scope.roster, $scope.userInfo.access_token).then(function(evalStatuses){
        $scope.evalStatuses = evalStatuses;
        })
    })
  }
})




  })

}

init()

}])