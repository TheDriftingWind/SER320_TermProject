app.factory("mainSvc", ["$http", "$location", function($http, $location){

  function createStudentAccount(firstname, lastname, sEmail, sPassword){
    return $http({ //Post the new account
            method: 'POST',
            url: 'http://localhost:3000/students', //send POST to student router
            data: { first_name: firstname, //put the information from enter in form from $scope
                    last_name: lastname,
                    email: sEmail,
                    password: sPassword
                  },
            headers: {'Content-Type':'application/json'}
          }).then(function(res){
            return res.data;
          })
  }
  function createProfessorAccount(firstname, lastname, profEmail, profPassword){
    return $http({ //Post the new account to collection
            method: 'POST', //send POST to professor with form data to make new prof account
            url: 'http://localhost:3000/professors',
            data: { first_name: firstname,
                    last_name: lastname,
                    email: profEmail,
                    password: profPassword
                  },
            headers: {'Content-Type':'application/json'}
          }).then(function(res){
            return res.data;
          })
  }

  function checkStudentEmail(email){//check if an email already exists for a student account(avoid duplicates)
    return $http.get('http://localhost:3000/students/emailExists/' + email).then(function(res){
      return res.data
    });
  }
  function checkProfessorEmail(email){//check professor email if it's already in the collection
    return $http.get('http://localhost:3000/professors/emailExists/' + email).then(function(res){
      return res.data
    });
  }

  return {
          createStudentAccount: createStudentAccount,
          createProfessorAccount: createProfessorAccount,
          checkStudentEmail: checkStudentEmail,
          checkProfessorEmail: checkProfessorEmail
      };

}]);
