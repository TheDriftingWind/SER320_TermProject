app.factory("mainSvc", ["$http", "$location", function($http, $location){

  function createStudentAccount(firstname, lastname, sEmail, sPassword){
    return $http({ //Post the new account
            method: 'POST',
            url: 'http://localhost:3000/students',
            data: { first_name: firstname,
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
            method: 'POST',
            url: 'http://localhost:3000/students',
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
    return $http.get('http://localhost:3000/professor/emailExists/' + email).then(function(res){
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
