app.controller("studentViewEvalCtrl", ["studentService", "authSvc", "$scope", "$location", "$window" , "$routeParams", function(studentService, authSvc, $scope, $location, $window, $routeParams){
    
$scope.userInfo = [];
$scope.index = parseInt($routeParams.index)+1; //gets the index of the completed evaluation from the ordered list in previous view in order to display
    
function init(){
authSvc.getToken().then(function(res){
    $scope.userInfo = JSON.parse(res);
  
    //gets the selected evaluation
    studentService.getEvaluationById($routeParams.courseId, $routeParams.projectId, $routeParams.evaluationId, $scope.userInfo.access_token).then(function(res){
        $scope.evaluation = res;
    })

})

}
    
$scope.logout = function(){
    authSvc.logout(); //clears token
    $location.path("/"); // sends back to login page
}

init()

}])