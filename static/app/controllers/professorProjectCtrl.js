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
      $scope.students = res;
    })
    profSvc.getProjectInfo($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
      $scope.projectInfo = res;
    })

    profSvc.getProjectEvaluations($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
      $scope.evaluations = res;
    })


  })
}

function getStudentName(studentId){
  for(i = 0; i < $scope.students.length; i++){
    if($scope.students[i]._id == studentId){
      return ($scope.students[i].first_name +' '+ $scope.students[i].last_name)
      break;
    }
  }
}


function deleteEvaluation(evaluationId){
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
