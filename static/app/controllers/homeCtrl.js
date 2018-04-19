app.controller("HomeCtrl", ["$scope", "$http", function($scope, $http){

 $scope.studentLogin = studentLogin;

  function studentLogin(){
    $http.post();
    //save the access_token in the $window session
  }

  function professorLogin(){
    $http.post();
  }

}]);
