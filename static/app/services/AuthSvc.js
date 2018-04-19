app.factory("authSvc", ["$http", "$location", "$window", "$q", function($http, $location, $window, $q){

  var userInfo;

  function studentLogin(sEmail, sPassword){ //compare login entered with credentials found server
    return $http({ //Post the new account
            method: 'POST',
            url: 'http://localhost:3000/api/studentLogin',
            data: {
                    email: sEmail,
                    password: sPassword
                  },
            headers: {'Content-Type':'application/json'}
          }).then(function(res){
            userInfo = {
              access_token: res.data.access_token,
              id: res.data.id
            };
            console.log("a_token:" + res.data.access_token)
            $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
            return res.data;
          })
  }

  function professorLogin(pEmail, pPassword){ //compare login entered with credentials found server
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/api/professorLogin',
      data: {
              email: pEmail,
              password: pPassword
            }
      //headers: {'Content-Type':'application/json'}
    }).then(function(res){
      userInfo = {
        access_token: res.data.access_token,
        id: res.data.id
      };
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      return res.data;
    })
  }

  function logout(){ //delete the token from sever to remove access
    return $http({
      method: 'POST',
      url: 'http://localhost:3000/api/logout',
      headers: {'Content-Type':'application/json'} //TODO: access_token needs to be sent
    }).then(function(res){
      return res.data;
    })
  }

  function getToken(){ //get the token for the session -- needed in the header for all HTTP methods
    var deferred = $q.defer();
    var userInfo = $window.sessionStorage["userInfo"];
    deferred.resolve(userInfo);
    return deferred.promise;
  }

  return {
        studentLogin: studentLogin,
        professorLogin: professorLogin,
        logout: logout,
        getToken: getToken
      };

}]);
