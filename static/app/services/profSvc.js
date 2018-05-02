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

    function getCourseById(id, token){
      return $http.get('http://localhost:3000/courses/'+id, {headers:{'access_token': token}}).then(function(res){
        return res.data;
      })
    }

    function getProjectsForCourse(courseId, token){
      return $http.get('http://localhost:3000/courses/'+courseId+'/projects', {headers:{'access_token': token}}).then(function(res){
        return res.data;
      })
    }

    function createProject(courseId, body, token){
      return $http({
        method: "POST",
        url: 'http://localhost:3000/courses/'+courseId+'/projects',
        data: {
          name: body.name,
          description: body.description,
          startDate: body.startDate,
          endDate: body.endDate
        },
        headers: {'access_token': token}
      }).then(function(res){
        return res.data;
      })
    }

    function getAllStudents(){
      return $http.get('http://localhost:3000/students/').then(function(res){
        return res.data;
      })
    }

    function addStudentToCourse(studentId, courseId, token){
      return $http({
        method: "POST",
        url: 'http://localhost:3000/courses/'+courseId+'/students',
        data: {
          studentId: studentId
        },
        headers: {'access_token': token}
      }).then(function(res){
        return res.data;
      })
    }

    function getCourseStudents(courseId, token){
      return $http.get('http://localhost:3000/courses/'+courseId+'/students', {headers:{'access_token': token}}).then(function(res){
        return res.data;
      })
    }

    function createTeam(courseId, body, token){
      return $http({
        method: "POST",
        url: 'http://localhost:3000/courses/'+courseId+'/teams',
        data: {
          teamName: body.name,
          students: body.selected,
          course: courseId
        },
        headers: {'access_token': token}
      }).then(function(res){
        return res.data;
      })
    }

    function getCourseTeams(courseId, token){
      return $http.get('http://localhost:3000/courses/'+courseId+'/teams', {headers:{'access_token': token}}).then(function(res){
        return res.data;
      })
    }

    function getProjectInfo(courseId, projectId, token){
      return $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId, {headers:{'access_token':token}}).then(function(res){
        return res.data;
      })
    }

    function getProjectEvaluations(courseId, projectId, token){
      return $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations', {headers:{'access_token':token}}).then(function(res){
        return res.data;
      })
    }

    function createEvaluations(body, courseId, projectId, token){
      return $http({
        method: "POST",
        url: 'http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations',
        data: {
          name : body.name,
          startDate: body.startDate,
          endDate: body.endDate,
        },
        headers: {'access_token': token}
      })
    }

    return {
      getProfessorCourses: getProfessorCourses,
      getProfessorById: getProfessorById,
      createNewCourse: createNewCourse,
      getCourseById: getCourseById,
      getProjectsForCourse: getProjectsForCourse,
      createProject: createProject,
      getAllStudents: getAllStudents,
      addStudentToCourse: addStudentToCourse,
      getCourseStudents: getCourseStudents,
      createTeam: createTeam,
      getCourseTeams: getCourseTeams,
      getProjectInfo: getProjectInfo,
      getProjectEvaluations: getProjectEvaluations,
      createEvaluations: createEvaluations
    }
}]);
