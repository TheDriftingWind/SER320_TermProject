app.controller("studentEvalFormCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , "$routeParams", function(studentService, authSvc, $scope, $location, $window, $routeParams){

$scope.userInfo = [];
$scope.form=[];//initialize form data object for ng-models
$scope.form.collaboration = '';
$scope.form.contribution = '';
$scope.form.responsiveness = '';
$scope.form.feedback = '';
function init(){

authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);

studentService.getStudentById($scope.userInfo.id).then(function(res){
      $scope.student = res;
    })

studentService.getCourseById($routeParams.courseId, $scope.userInfo.access_token).then(function(res){
    $scope.course = res;
});

studentService.getProjectById($routeParams.courseId, $routeParams.projectId, $scope.userInfo.access_token).then(function(res){
    $scope.project = res;
    })

studentService.getEvaluationById($routeParams.courseId, $routeParams.projectId, $routeParams.evaluationId, $scope.userInfo.access_token).then(function(res){
    $scope.evaluation = res;
    if(res.feedback){
      $scope.form.feedback = res.feedback;
    }

    //if student has selected a rating for collaboration
    if(res.collaboration)
    $scope.form.collaboration = res.collaboration.toString();

    //if student has selected a rating for contribution
    if(res.contribution)
    $scope.form.contribution = res.contribution.toString();

    //if student has selected a rating for responsiveness
    if(res.responsive)
    $scope.form.responsiveness = res.responsive.toString();
})

})


}

    //allows student to save their work without submitting evaluation
$scope.save = function(){

    studentService.continueEvaluation($routeParams.courseId, $routeParams.projectId, $routeParams.evaluationId, $scope.userInfo.access_token, $scope.form.feedback, $scope.form.collaboration, $scope.form.contribution, $scope.form.responsiveness, $scope.evaluation.status).then(function(res){});
 $location.path("/student/course/"+$routeParams.courseId+"/project/"+$routeParams.projectId+"/evaluations") //sends student back to evaluations page
}

//allows student to submit evaluation once they are finished
$scope.submit = function(){
    studentService.continueEvaluation($routeParams.courseId, $routeParams.projectId, $routeParams.evaluationId, $scope.userInfo.access_token, $scope.form.feedback, $scope.form.collaboration, $scope.form.contribution, $scope.form.responsiveness, false).then(function(res){});
 $location.path("/student/course/"+$routeParams.courseId+"/project/"+$routeParams.projectId+"/evaluations")
}

$scope.logout = function(){
    authSvc.logout();
    $location.path("/");
}
init()

}])
