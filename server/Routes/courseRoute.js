var express = require('express');
var courseRouter = express.Router();
var courses = require('../models/course');
var students = require('../models/student');
var projects = require('../models/project');
var evaluations = require('../models/evaluation');
var teams = require('../models/team.js')

var mongoose = require('mongoose');

courseRouter.route('/')
  .get(function(req, res, next){
    courses.find({}, function(err, courses){
      if(err) throw err;
      res.json(courses);
    });
  })
  .post(function(req, res, next) { //prof. make a new course (Req 5.2)
    courses.create(req.body, function(err, course){
        if(err)
            throw err;
        res.json(course);
        })
  });

courseRouter.route('/professor/:profId')//return only the courses that a professor owns
  .get(function(req, res, next){
    courses.find({professor : req.params.profId}, function(err, courses){
      if(err) throw err;
      res.json(courses)
    })
  })

courseRouter.route('/:courseId')
  .get(function(req, res, next){
    courses.findById(req.params.courseId, function(err, course){
        if(err)
            throw err;
        res.json(course);


    });
  })
  .delete(function(req, res, next){
    courses.findByIdAndRemove(req.params.courseId, function(err, resp){
        if (err) throw err;
        res.json(resp);
    })
  });

courseRouter.route('/:courseId/teams') //add new teams and get all teams
  .get(function(req, res, next){
    teams.find({course: req.params.courseId}, function(err, teams){
      if(err) throw err
      res.json(teams);
    });
  })
  .post(function(req, res, next){
    teams.create(req.body, function(err, team){
      res.json(team._id);
    });
  });

courseRouter.route('/:courseId/teams/:teamId')
  .get(function(req, res, next){
    teams.findById(req.params.teamId, function(err, team){
      if(err) throw err;
      students.find()
       .where('_id')
       .in(team.students)
       .exec(function(err, result){
          if (err) throw err;
          var completeTeam = team;
          completeTeam.students = result;
          console.log(result);
          res.json(completeTeam); //returns projects with ids in course.projects
      })
    })
  })
  .put(function(req, res, next){
    team.findByIdAndUpdate(req.params.teamId, {
        $set:req.body //assuming body contains the update which it will if getting from form
        //Step 1 - find project and update it
      },{
        new: true
      }, function(err, project){
          if(err) throw err;
          res.json(project);
      });
    })

courseRouter.route('/:courseId/students')//get all the students registered for a specific course
  .get(function(req, res, next){
    courses.findById(req.params.courseId, function(err, course){ //Step 1. find the course by ID
        if(err) throw err; //Step 2. get the collection of student IDs
        students.find() //Step 3. Query the students collection
        .where('_id') //Get all students where _id matches with collection found in course object
        .in(course.students)
        .exec(function(err, students){
          if(err) throw err
          res.json(students) //Step 4. return the matches
        })
    })
  })
  .post(function(req, res, next){ //only add students
   courses.findById(req.params.courseId, function(err, course){
        if(err) throw err;
        course.students.push(req.body.studentId);
       course.save(function(err, course){
           res.json(course);
       })
    })
  });


courseRouter.route('/:courseId/students/:studentId')
  .get(function(req, res, next){
     courses.findById(req.params.courseId, function(err, course){
        if(err)
            throw err;

    students.findById(req.params.studentId, function(err, student){
        if(err) throw err;
        res.json(student);
    })
    });
  })
  .delete(function(req, res, next){
     courses.findById(req.params.courseId, function(err, course){
        if(err)
            throw err;

    course.students.findByIdAndRemove(req.params.studentId, function(err, resp){
        if(err) throw err;
        res.json(resp);
    })
    });
  });

courseRouter.route('/:courseId/projects')
  .get(function(req, res, next){
    //Finds the specific course by ID
    courses.findById(req.params.courseId, function(err, course){
      if(err) throw err;
        //takes an array of values and searches the projects collection for objects that match those values for a specific attribute
       projects.find()
        .where('_id')
        .in(course.projects)
        .exec(function(err, result){
           if (err) throw err;
           res.json(result); //returns projects with ids in course.projects
        })
      })
    })
  .post(function(req, res, next){
    //Step 1 - Make the project in project collection
    projects.create(req.body, function(err, project){
      if(err) throw err;
      console.log("Added Project");
    //Step 2 - take the id of the new project...
      var id = project._id
      // Step 3 - find the course with the courseId
      courses.findById(req.params.courseId, function(err, course){
        if(err) throw err;
        // Add the new projectId
        course.projects.push(id);
        res.json(id);
        course.save(function(err, course){
          if(err) throw err;
        });
      })
    })
  });

courseRouter.route('/:courseId/projects/:projectId')
  .get(function(req, res, next){
    projects.findById(req.params.projectId, function(err, project){
      if(err) throw err;
      res.json(project);
    });
  })
  .put(function(req, res, next){
    //Note that updating a collection item will CHANGE its id********
    //Need to get the id again and update it
    projects.findByIdAndUpdate(req.params.projectId, {
      $set:req.body //assuming body contains the update which it will if getting from form
      //Step 1 - find project and update it
    },{
      new: true
    }, function(err, project){
        if(err) throw err;
        res.json(project)
    });
  })
  .delete(function(req, res, next){
    project.findByIdAndRemove(req.params.projectId, function(err, res){
      if(err) throw err;
      res.json(res);
    });
  });

courseRouter.route('/:courseId/projects/:projectId/evaluations') //gets all the evaluations in the specific project
  .get(function(req, res, next){
   //Finds the specific project by ID
    projects.findById(req.params.projectId, function(err, project){
      if(err) throw err;
        //takes an array of values and searches the evaluations collection for objects that match those values for a specific attribute
       evaluations.find()
        .where('_id')
        .in(project.evaluations)
        .exec(function(err, result){
           if (err) throw err;
           res.json(result); //returns projects with ids in project.evaluations
        })
      })
  })
  .post(function(req, res, next){ // add evaluations by making a cartesian product out of all the students in a team for a course
    //step 1 Find the teams in the course
    teams.find()
    .where('course')
    .in(req.params.courseId)
    .exec(function(err,teams){
      if(err) throw err;
      //perform for each team...
      for(i = 0; i < teams.length; i++){
        //make array of students in team
        var students = teams[i].students
        // Create cartesian product of students in each team
        var createdEvals = [];
        for(j = 0; j < students.length; j++){
          for(k = 0; k < students.length; k++){
            if(j != k){ //exclude students from evaluating themselves
              req.body.evaluator = students[j];
              req.body.evaluatee = students[k];
              //create the evaluations
              evaluations.create(req.body, function(err, evaluation){
                if(err) throw err
                projects.findById(req.params.projectId, function(err, project){
                  if(err) throw error
                  //find the project and push the new evaluation id to it
                  console.log(createdEvals)
                  project.evaluations.push(evaluation._id)
                  project.save(function(err, project){
                    if(err) throw err
                  })
                })
              })
            }
          }
        }
      }
      //after creating all of the evaluations, return projectId
      res.json(req.params.projectId)
    })
  });

courseRouter.route('/:courseId/projects/:projectId/evaluations/:evaluationId') // gets a specific evaluation
  .get(function(req, res, next){
    evaluations.findById(req.params.evaluationId, function(err, evaluation){
      if(err) throw err;
      res.json(evaluation);
    })
  })
  .put(function(req, res, next){
    evaluations.findByIdAndUpdate(req.params.evaluationId, {
      $set:req.body //assuming body contains the update which it will if getting from form
      //Step 1 - find project and update it
    },{
      new: true
    }, function(err, evaluation){
        if(err) throw err;
        res.json(evaluation)
    })
  })
  .delete(function(req, res, next){
    evaluations.findByIdAndRemove(req.params.evaluationId, function(err, eval){
      if(err) throw err;
      res.json(eval);
    })
  });

module.exports = courseRouter;
