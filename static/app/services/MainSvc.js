app.factory("mainSvc", ["$http", "$location", function($http, $location){

  // function createStudentAccount(first_name, last_name, sEmail, sPassword){
  //   //Step 1. check if account already exists(look for if email is already used)
  //   var result;
  //
  //   $http.get('http://localhost:3000/students/emailExists/' + sEmail).then(function(res){
  //     if(!res){
  //       //Step 2. if account doesn't exist, make the account
  //       $http({
  //         method: 'POST',
  //         url: 'http://localhost:3000/students',
  //         data: { first_name: first_name,
  //                 last_name: last_name,
  //                 email: sEmail,
  //                 password: sPassword
  //               },
  //         headers: {'Content-Type':'application/json'}
  //       }).then(function(res){
  //         //send them back the response
  //         result = res;
  //       })
  //     } else {
  //       result = null;
  //     }
  //   }); //function end
  //
  //   // return result;
  // }
  //
  // function createProfessorAccount(first_name, last_name, profEmail, profPassword){
  //   var result;
  //
  //   //Step 1. check if professor account already exists
  //   $http.get('http://localhost:3000/professors/emailExists/'+profEmail).then(function(res){
  //     if(!res){
  //       //Step 2. if account doesn't exist, make the account
  //       $http({
  //         method: 'POST',
  //         url: 'http://localhost:3000/professors',
  //         data: { first_name: first_name,
  //                 last_name: last_name,
  //                 email: profEmail,
  //                 password: profPassword
  //               },
  //         headers: {'Content-Type':'application/json'}
  //       }).then(function(res){
  //         //send them back to the login page
  //         result = res;
  //       })
  //     }else{
  //       //else... show that account with email already exists
  //       result = null;
  //     }
  //   });//function end
  //
  //   // return result;
  // }

    function checkEmail(email){
      return $http.get('http://localhost:3000/students/emailExists/' + email).then(function(res){
        return res
      });
    }
  return {
          // createStudentAccount: createStudentAccount,
          // createProfessorAccount: createProfessorAccount
          checkEmail: checkEmail
      };

}]);
