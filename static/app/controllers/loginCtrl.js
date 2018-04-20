app.controller("LoginCtrl", ["authSvc", "$scope", "$http", "$window","$location", function(authSvc, $scope, $http, $window, $location){

 $scope.studentLogin = studentLogin;
 $scope.professorLogin = professorLogin;

  function studentLogin(){
    authSvc.studentLogin($scope.studentEmail, $scope.studentPassword).then(function(res){
        if(res.access_token){ //if service respond with token, login succeeded
          $location.path('/student/')
        } else { //else login failed
          $window.alert('Invalid Password or Email')
        }
    })
    //save the access_token in the $window session
  }

  function professorLogin(){
    authSvc.professorLogin($scope.profEmail, $scope.profPassword).then(function(res){
        if(res.access_token){ //if service respond with token, login succeeded
          $location.path('/professor/')
        } else { //else login failed
          $window.alert('Invalid Password or Email')
        }
    })
  }

}]);
