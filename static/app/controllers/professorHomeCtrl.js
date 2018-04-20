app.controller("professorHomeCtrl", ["profSvc", "authSvc", "$scope", "$location", "$window" , function(profSvc, authSvc, $scope, $location, $window){

$scope.userInfo = [];

function init(){ //run this function upon changing view
  authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);
    profSvc.getProfessorById($scope.userInfo.id).then(function(res){ //get the prof's account info
      $scope.professor = res;
    });
    profSvc.getProfessorCourses($scope.userInfo.id, $scope.userInfo.access_token).then(function(res){ //get all their courses
      $scope.courses = res;
    });
  })
}
init() //setup the page


}]);
