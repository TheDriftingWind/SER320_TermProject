app.controller("professorProjectCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){

$scope.courseId = $routeParams.courseId;
$scope.projectId = $routeParams.projectId;
$scope.logout = logout;
$scope.deleteEvaluation = deleteEvaluation;
$scope.getStudentName = getStudentName;

init()

function init(){
  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);

    profSvc.getCourseStudents($scope.courseId, $scope.userInfo.access_token).then(function(res){
      $scope.students = res; //get the students to match names to ids
    })
    profSvc.getProjectInfo($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
      $scope.projectInfo = res;
    })
    profSvc.getProjectEvaluations($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
      $scope.evaluations = res;
    })


  })
}

function getStudentName(studentId){ //match student ids from the table with preloaded student accounts
  for(i = 0; i < $scope.students.length; i++){
    if($scope.students[i]._id == studentId){ //look through the collection...
      return ($scope.students[i].first_name +' '+ $scope.students[i].last_name) //return the name that matches the id
      break;
    }
  }
}


function deleteEvaluation(evaluationId){ //pass the Id in the table to delete an evaluation
  authSvc.getToken().then(function(res){
    profSvc.deleteEvaluation($scope.courseId, $scope.projectId, evaluationId, $scope.userInfo.access_token).then(function(res){
      init();
    })
  })
}

function logout(){
  authSvc.logout().then(function(res){
    $location.path('/login')
  });
}

}]);
