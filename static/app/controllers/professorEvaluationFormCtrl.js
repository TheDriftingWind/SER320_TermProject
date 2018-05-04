app.controller("professorEvaluationFormCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams", function(profSvc, authSvc, $scope, $location, $window, $routeParams){

$scope.submit = submit;
$scope.data = [];
$scope.data.name = '';
$scope.data.startDate = '';
$scope.data.endDate = '';
$scope.logout = logout;
$scope.courseId = $routeParams.courseId;
$scope.projectId = $routeParams.projectId;

function submit(){
  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);
    profSvc.createEvaluations($scope.data, $routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
      $location.path("professor/course/"+$routeParams.courseId+"/project/"+$routeParams.projectId); //path back to the project page after creation
    });
  })
}

function logout(){
  authSvc.logout().then(function(res){
    $location.path('/login')
  });
}

}]);
