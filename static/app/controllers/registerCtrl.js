app.controller("RegisterCtrl", ["$scope", "$http", "$location", "$q", function($scope, $http, $location, $q){

  $scope.showExists = false;
  $scope.submit = submit;
  $scope.f_name = '';
  $scope.l_name = '';
  $scope.email = '';
  $scope.password = '';

  $http.get('http://localhost:3000/students/').then(function(res){
      console.log(res)
      console.log('called http')
  }, function(err){
    console.log(err)
  })
  console.log('regCtrl');

  $http({
    method: 'GET',
    url: 'localhost:3000/students',
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  }).then(function(res){
    console.log(res)
  }, function(err){
    console.log(err)
  })

  function submit(){
    console.log($scope.type);
    //if account type is student... create student account
    if($scope.type == 'Student'){
      console.log('called 1')
      //Step 1. check if account already exists(look for if email is already used)
      $http.get('localhost:3000/students/emailExists/'+$scope.email)
      .then(function(res){
        console.log('called 2')
        if(!res){
          //Step 2. if account doesn't exist, make the account
          $http({
            method: 'POST',
            url: 'localhost:3000/professors',
            data: { first_name: $scope.f_name,
                    last_name: $scope.l_name,
                    email: $scope.email,
                    password: $scope.password
                  },
            headers: {'Content-Type':'application/json'}
          }).then(function(res){
            //send them back to the login page
            $location.path('/')
          })
        }else{
          //else... show that account with that email already exists
          $scope.showExists = true;
          console.log("3")
        }
      })

    }else{
      console.log("4")
      //if account type is professor... create professor account
      //Step 1. check if professor account already exists
      $http.get('localhost:3000/professors/emailExists/'+$scope.email).then(function(res){
        console.log("5")
        if(!res){
          //Step 2. if account doesn't exist, make the account
          $http({
            method: 'POST',
            url: 'localhost:3000/professors',
            data: { first_name: $scope.f_name,
                    last_name: $scope.l_name,
                    email: $scope.email,
                    password: $scope.password
                  },
            headers: {'Content-Type':'application/json'}
          }).then(function(res){
            //send them back to the login page
            $location.path('/')
          })
        }else{
          console.log("6")
          //else... show that account with email already exists
          $show.showExists = true;
        }
      })
    }
  }

  function validate(){
    if(document.getElementById("email").value.includes("@quinnipiac.edu") == false){
      alert("Invalid Email");
    }
  }


}]);
