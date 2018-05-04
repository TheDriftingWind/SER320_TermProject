app.controller("professorViewTeamCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){

$scope.logout = logout;
$scope.courseId = $routeParams.courseId;

init() //initialize information

function init(){
  authSvc.getToken().then(function(res){ //get token
    $scope.userInfo = JSON.parse(res); //use token in the service method call -- get team information
    profSvc.getTeam($routeParams.courseId, $routeParams.teamId, $scope.userInfo.access_token).then(function(res){
      $scope.teams = res;
    })

  })
}

function logout(){
  authSvc.logout().then(function(res){
    $location.path('/login')
  });
}

}]);
