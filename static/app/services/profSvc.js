app.factory("profSvc", ["authSvc", "$http", "$location", function(authSvc, $http, $location){

    function getProfessorById(profId){ //Get the professor's account information to display(first, lastname, etc...)
      //Can return $http.get().then() -- It's already of type promise
      return $http.get('http://localhost:3000/professors/'+profId).then(function(res){
        return res.data
      })
    }

    function getProfessorCourses(profId, token){ //get all courses for a professor
      return $http.get('http://localhost:3000/courses/professor/'+profId, {headers: {'access_token': token }}).then(function(res){
        return res.data;
      }) //TODO: Make that route
    }

    function createNewCourse(body, profId, token){
      return $http({
        method: "POST",
        url:'http://localhost:3000/courses',
        data: {
          name: body.name,
          course_number: body.course_number,
          professor: profId,
          term: body.term //not adding the students or projects upon first creation -- add during update
        },
        headers: {'access_token': token}
      }).then(function(res){
        return res.data;
      })
    }



    return {
      getProfessorCourses: getProfessorCourses,
      getProfessorById: getProfessorById,
      createNewCourse: createNewCourse
    }
}]);
