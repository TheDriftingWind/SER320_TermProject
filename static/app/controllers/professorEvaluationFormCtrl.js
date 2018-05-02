app.controller("professorEvaluationFormCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams", function(profSvc, authSvc, $scope, $location, $window, $routeParams){

$scope.submit = submit;
$scope.data = [];
$scope.data.name = '';
$scope.data.startDate = '';
$scope.data.endDate = '';

function submit(){
  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);
    profSvc.createEvaluations($scope.data, $routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
      $location.path("professor/course/"+$routeParams.courseId+"/project/"+$routeParams.projectId);
    });
  })
}

}]);
