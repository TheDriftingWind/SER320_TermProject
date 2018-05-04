app.controller("professorProjectFormCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window", "$routeParams" , function(profSvc, authSvc, $scope, $location, $window, $routeParams){
  $scope.data = [];
  $scope.data.name = ''
  $scope.data.startDate = ''
  $scope.data.endDate = ''
  $scope.submit = submit;
  $scope.logout = logout;
  $scope.courseId = $routeParams.courseId;

  init();


  function init(){
    //get the Token
    authSvc.getToken().then(function(res){
      $scope.userInfo = JSON.parse(res);

    })

  }


  function submit(){
    profSvc.createProject($routeParams.courseId,$scope.data, $scope.userInfo.access_token).then(function(res){
      if(!res){
        console.log('no record error') //no record was created
      }else{
        $location.path('/professor/course/'+$routeParams.courseId) //if project was created, path back to course page
      }
    })
  }

  function logout(){
    authSvc.logout().then(function(res){
      $location.path('/login')
    });
  }

}]);
