app.controller("RegisterCtrl", ["mainSvc", "$scope", "$location", "$window" , function(mainSvc, $scope, $location, $window){

  $scope.showExists = false;
  $scope.submit = submit;
  $scope.f_name = '';
  $scope.l_name = '';
  $scope.email = '';
  $scope.password = '';
  $scope.type = ''

  function submit(){
    console.log($scope.type);
    if($scope.type == 'Student'){
      //If student account is selected -- check if email exists in student collection
      mainSvc.checkStudentEmail($scope.email).then(function(res){
        console.log(res)
        if(!res || res.length == 0){
          console.log("make new account")
          //if the return is empty no email was found -- OK to make the new account
          mainSvc.createStudentAccount($scope.f_name, $scope.l_name, $scope.email, $scope.password).then(function(res){
            $location.path('/') //redirect to login page
          })
        } else {
          console.log("already exists")
          //show that account exists if one is found
          $scope.showExists = true;
        }

      })
    } else if($scope.type == 'Professor') {
      //Account type is professor
      mainSvc.checkProfessorEmail($scope.email).then(function(res){
        if(!res || res.length == 0){
          //if the return is empty no email was found -- OK to make the new account
          mainSvc.createProfessorAccount($scope.f_name, $scope.l_name, $scope.email, $scope.password).then(function(res){
            $location.path('/') //redirect to login page
          })
        } else {
          //show that account exists if one is found
          $scope.showExists = true;
        }
      })
    }
  }

}]);
