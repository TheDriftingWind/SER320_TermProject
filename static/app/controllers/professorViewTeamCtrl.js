app.controller("professorViewTeamCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){

init()

function init(){
  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);
    profSvc.getTeam($routeParams.courseId, $routeParams.teamId, $scope.userInfo.access_token).then(function(res){
      $scope.teams = res;
      // console.log(res);
      console.log($scope.teams)
    })

  })
}

}]);
