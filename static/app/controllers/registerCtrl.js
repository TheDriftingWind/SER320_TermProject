app.controller("RegisterCtrl", ["mainSvc", "$scope", "$location", "$window" , function(mainSvc, $scope, $location, $window){

  $scope.showExists = false;
  $scope.submit = submit;
  $scope.f_name = '';
  $scope.l_name = '';
  $scope.email = '';
  $scope.password = '';

  // $http.get('http://localhost:3000/students/').then(function(res){
  //     console.log(res)
  //     console.log('called http')
  // }, function(err){
  //   console.log(err)
  // })

  function submit(){
    console.log($scope.type);
    mainSvc.checkEmail($scope.email).then(function(res){
      console.log(res)
    })
    //if account type is student... create student account
    // if($scope.type == 'Student'){
    //   mainSvc.createStudentAccount($scope.f_name, $scope.l_name, $scope.email, $scope.password).then(function(res){
    //     if(!res){
    //       // $window.alert("Email Already Exists");
    //       //if res is null, show that account with that email already exist
    //       $scope.showExists = true;
    //     } else {
    //       //else the account was made, return to login
    //       $location.path('/')
    //     }
    //
    //
    //   }, function(err){
    //     $window.alert("Error");
    //     $scope.showExists = true;
    //   });
    // }else{
    //   //if account type is professor... create professor account
    //   mainSvc.createProfessorAccount($scope.f_name, $scope.l_name, $scope.email, $scope.password).then(function(res){
    //     if(!res){
    //       //if no response... account exists
    //       $scope.showExists = true;
    //     } else {
    //       $location.path('/');
    //     }
    //   }, function(err){
    //     $window.alert("Error");
    //     $scope.showExists = true;
    //   });
    // }
  }

  function validate(){
    if(document.getElementById("email").value.includes("@quinnipiac.edu") == false){
      alert("Invalid Email");
    }
  }


}]);
