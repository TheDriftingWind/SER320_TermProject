app.factory("studentService", ["$http", "$location", function($http, $location){

    
    function getStudentById(studentId){
       return $http.get('http://localhost:3000/students/'+studentId).then(function(res){
         return res.data;
       });
    }
    
    //get courses that student is enrolled in
    function getStudentCourses(studentId, token){
        return $http.get('http://localhost:3000/courses/', {headers: {'access_token': token }} ).then(function(res){
              var studentCourses = [];

            if(!res){
               //error in code
            }

            else{

                //check each course in system
                for (var index in res.data){
                    course = res.data[index];
                    
                    var existingIndex = course.students.indexOf(studentId); 
                    
                    //if student exists in student array, student is enrolled in course
                    if(existingIndex>-1){
                        studentCourses.push(course);
                    }

                }
            }
            return studentCourses;
        });
    }

    function getCourseById(courseId, token){
         return $http.get('http://localhost:3000/courses/'+courseId, {headers: {'access_token': token }}).then(function(res){
             return res.data;
             });

    }

    function getProjects(courseId, token){
         return $http.get('http://localhost:3000/courses/'+courseId+'/projects/', {headers: {'access_token': token }}).then(function(res){
           return res.data;
         });
    }

    function getProjectById(courseId, projectId, token){
         return $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId, {headers: {'access_token': token }}).then(function(res){
           return res.data;
         });
    }

    //gets a collection of student objects by ids
    function getStudentGroup(studentIds){
        return $http({ //Post the new account
                method: 'POST',
                url: 'http://localhost:3000/students/group',
                data: {
                        students: studentIds
                      },
                headers: {'Content-Type':'application/json'}
              }).then(function(res){
                return res.data;
              })
    }

    function getStudentTeam(courseId, studentId, token){
      return $http.get('http://localhost:3000/courses/'+courseId+'/teams', {headers: {'access_token': token }} ).then(function(res){
            var studentTeam;

          if(!res){
             //error in code

          }

          else{
              //check each team existing in course
              for (var index in res.data){
                  team = res.data[index];
                  var existingIndex = team.students.indexOf(studentId);
                  
                  //if student exists in student array, student is in team
                  if(existingIndex>-1){
                      studentTeam=team;
                  }

              }
          }
          return studentTeam;
      });
    }
    
    function getTeamById(courseId, teamId, token){
         return $http.get('http://localhost:3000/courses/'+courseId+'/teams/'+teamId, {headers: {'access_token': token }}).then(function(res){
           return res.data;
         });
    }
    
    function getEvaluationsAsEvaluator(courseId, studentId, projectId, roster, token){
        
        return $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations', {headers: {'access_token': token }}).then(function(res){
                 var evaluations = []

          if(!res){
             //error in code

          }

          else{
            for(i=0; i<roster.length; i++){
                //checks each evaluation in the project
              for (var index in res.data){
                  evaluation = res.data[index];
                  //if the evaluation was created by the current student and is for the current teammate
                  if(evaluation.evaluatee == roster[i]._id && evaluation.evaluator == studentId){
                      //returns all evals
                evaluations.push(evaluation);
                  }
                
              }
          }
          }
          return evaluations;
         });
    }
    
     function getEvaluationsAsEvaluatee(courseId, studentId, projectId, roster, token){
        
        return $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations', {headers: {'access_token': token }}).then(function(res){
                 var evaluations = []

          if(!res){
             //error in code

          }

          else{
            for(i=0; i<roster.length; i++){
                //checks each evaluation in the project
              for (var index in res.data){
                  evaluation = res.data[index];
                  //if the evaluation was created by the current teammate and is for the logged in student
                  if(evaluation.evaluator == roster[i]._id && evaluation.evaluatee == studentId){
                      //returns all evals
                evaluations.push(evaluation);
                  }
                
              }
          }
          }
          return evaluations;
         });
    }
    
    function getEvaluationById(courseId, projectId, evaluationId, token){
         return $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations/'+evaluationId, {headers: {'access_token': token }}).then(function(res){
                return res.data;
         })

    }
    
    //saves the data from the eval form filled by student, student may update evaluation multiple times until they hit submit
    function continueEvaluation(courseId, projectId, evaluationId, token, f_feedback, f_collaboration, f_contribution, f_responsive, f_status){
         return $http({
           method: 'PUT',
          url: 'http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations/'+evaluationId,
          data: { feedback: f_feedback,
                collaboration: parseInt(f_collaboration),
                contribution: parseInt(f_contribution),
                 responsive: parseInt(f_responsive),
                 status: f_status
                 },
           headers: {'Content-Type':'application/json', 'access_token': token}
         }).then(function(res){
                return res.data;
              })
    }


    return {
        getStudentById: getStudentById,
        getStudentCourses: getStudentCourses,
        getCourseById: getCourseById,
        getProjects: getProjects,
        getProjectById: getProjectById,
        getStudentTeam: getStudentTeam,
        getStudentGroup: getStudentGroup,
        getTeamById: getTeamById,
        getEvaluationById: getEvaluationById,
        getEvaluationsAsEvaluator: getEvaluationsAsEvaluator,
        getEvaluationsAsEvaluatee: getEvaluationsAsEvaluatee,
        continueEvaluation: continueEvaluation

    }
}]);
