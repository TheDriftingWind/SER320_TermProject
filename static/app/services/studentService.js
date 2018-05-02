app.factory("studentService", ["$http", "$location", function($http, $location){


    function getStudentById(studentId){
       return $http.get('http://localhost:3000/students/'+studentId).then(function(res){
         return res.data;
       });
    }
    function getStudentCourses(studentId, token){
        return $http.get('http://localhost:3000/courses/', {headers: {'access_token': token }} ).then(function(res){
              var studentCourses = [];

            if(!res){
               //error in code
            }

            else{

                for (var index in res.data){
                    course = res.data[index];
                    var existingIndex = course.students.indexOf(studentId);

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
              for (var index in res.data){
                  team = res.data[index];
                  var existingIndex = team.students.indexOf(studentId);

                  if(existingIndex>-1){
                      studentTeam=team;
                      console.log(team);
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

    function getEvalStatuses(courseId, studentId, projectId, roster, token){
        return $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations', {headers: {'access_token': token }}).then(function(res){
                 var evalStatuses = []

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
                      //gives the current status
                evalStatuses[i]=evaluation.status
                      break;
                  }
                  
                  else{
                      //eval hasn't been started
                    evalStatuses[i]= false
                  }

              }
          }
          }
          return evalStatuses;
         });
    }

    function fillEvaluation(courseId, projectId, evaluator_id, evaluatee_id, f_feedback, f_collaboration, f_contribution, f_responsive, f_status, token){
         return $http({
           method: 'POST',
          url: 'http://localhost:3000/courses'+courseId+'/projects/'+projectId+'/evaluations',
          data: { evaluatorId: evaluator_id,
                   evaluateeId: evaluatee_id,
                   feedback: f_feedback,
                   collaboration: f_collaboration,
                contribution: f_contribution,
                 responsive: f_responsive,
                 status: f_status
                 },
           headers: {'Content-Type':'application/json', 'access_token': token}
         })
       }


    function continueEvaluation(evaluationId, f_feedback, f_collaboration, f_contribution, f_responsive, f_status, token){
         return $http({
           method: 'PUT',
          url: 'http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations/'+evaluationId,
          data: { feedback: f_feedback,
                collaboration: f_collaboration,
                contribution: f_contribution,
                 responsive: f_responsive,
                 status: f_status
                 },
           headers: {'Content-Type':'application/json', 'access_token': token}
         })
    }

    function viewEvaluations(courseId, projectId, studentId, token){
         $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations', {headers: {'access_token': token }}).then(function(res){
              var studentEvaluations = [];

            if(!res){
               //error in code
            }

            else{

                    studentEvaluations = res.filter(function(evaluation){
                        return evaluation.evaluatee == studentId;
                    });
                }

            return studentEvaluations;
        });
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
        fillEvaluation: fillEvaluation,
        continueEvaluation: continueEvaluation,
        viewEvaluations: viewEvaluations,
        getEvalStatuses: getEvalStatuses

    }
}]);
