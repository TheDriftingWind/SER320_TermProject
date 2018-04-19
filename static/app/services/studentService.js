app.factory("studentService", ["$http", "$location", function($http, $location){

    function getStudentById(studentId){
       return $http.get('http://localhost:3000/students/' + studentId).then(function(res){
         return res.data;
       });
    }
    function getStudentCourses(studentId){
        return $http.get('http://localhost:3000/courses/').then(function(res){
              var studentCourses = [];

            if(!res){
               //error in code
            }

            else{

                for (var course in res.data[0]){
                    var result = course.students.filter(function(student){
                        return student._id == studentId;
                    });

                    if(result.length > 0){
                        studentCourses.push(course);
                    }
                }
            }
            return studentCourses;
        });
    }

    function getCourseById(courseId){
         return $http.get('http://localhost:3000/courses/'+courseId);
    }

    function getProjects(courseId){
         return $http.get('http://localhost:3000/courses/'+courseId+'/projects/');
    }

    function getProjectById(courseId, projectId){
         return $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId);
    }

    function getTeamById(courseId, teamId){
         return $http.get('http://localhost:3000/courses/'+courseId+'/teams/'+teamId);
    }


    function fillEvaluation(courseId, projectId, evaluator_id, evaluatee_id, f_feedback, f_collaboration, f_contribution, f_responsive, f_status){
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
           headers: {'Content-Type':'application/json'}
         })
       }


    function continueEvaluation(evaluationId, f_feedback, f_collaboration, f_contribution, f_responsive, f_status){
         return $http({
           method: 'PUT',
          url: 'http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations/'+evaluationId,
          data: { feedback: f_feedback,
                collaboration: f_collaboration,
                contribution: f_contribution,
                 responsive: f_responsive,
                 status: f_status
                 },
           headers: {'Content-Type':'application/json'}
         })
    }

    function viewEvaluations(courseId, projectId, studentId){
         $http.get('http://localhost:3000/courses/'+courseId+'/projects/'+projectId+'/evaluations').then(function(res){
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
        getTeamById: getTeamById,
        fillEvaluation: fillEvaluation,
        continueEvaluation: continueEvaluation,
        viewEvaluations: viewEvaluations

    }
}]);
