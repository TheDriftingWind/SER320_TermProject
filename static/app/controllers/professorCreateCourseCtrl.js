app.controller("createCourseCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window" , function(profSvc, authSvc, $scope, $location, $window){

  $scope.createCourse = createCourse;
  $scope.data = [];
  $scope.data.name = '';
  $scope.data.course_number = '';
  $scope.data.term = '';

  function createCourse(){
    authSvc.getToken().then(function(res){
      $scope.userInfo = JSON.parse(res);
      profSvc.createNewCourse($scope.data, $scope.userInfo.id, $scope.userInfo.access_token).then(function(res){
        $location.path("/professor")
      })
    });
  }

}]);
