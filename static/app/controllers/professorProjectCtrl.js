app.controller("professorProjectCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){

$scope.courseId = $routeParams.courseId;
$scope.projectId = $routeParams.projectId

init()

function init(){
  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);

    profSvc.getProjectInfo($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
      $scope.projectInfo = res;
      console.log(res)
    })

    profSvc.getProjectEvaluations($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
      $scope.evaluations = res;
      console.log(res)
    })

  })
}

}]);
