app.controller("professorViewEvaluationCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){

$scope.courseId = $routeParams.courseId;
$scope.projectId = $routeParams.projectId;

init()

function init(){
  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);
    profSvc.getEvaluation($routeParams.courseId, $routeParams.projectId, $routeParams.evaluationId, $scope.userInfo.access_token).then(function(res){
      $scope.evaluation = res;
    })

  })
}

}]);
