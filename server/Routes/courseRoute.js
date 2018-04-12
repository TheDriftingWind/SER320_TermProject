var express = require('express');
var courseRouter = express.Router();
var courses = require('../models/course');
var students = require('../models/student');
var projects = require('../models/project');
var evaluations = require('../models/evaluation');

var mongoose = require('mongoose');

courseRouter.route('/')
  .get(function(req, res, next){
    courses.find({}, function(err, courses){
      if(err) throw err;
      res.json(courses);
      //res.end('done');
    });
  })
  .post(function(req, res, next) { //prof. make a new course (Req 5.2)
    courses.create(req.body, function(err, course){
        if(err)
            throw err;

        //res.writeHead(200, {'Content/Type': 'text-plain'});
        res.end('Course '+course._id+' has been created');
        })
  });

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

courseRouter.route('/:courseId/students')
  .get(function(req, res, next){
    courses.findById(req.params.courseId, function(err, course){
        if(err) throw err;
        res.json(course.students);
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
    courses.findById(req.params.courseId, function(err, course){
      if(err) throw err;
      res.json(course.projects)
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
        res.end('Added project - id:' + id + " to course - id:" + req.params.courseId);
        course.save(function(err, course){
          if(err) throw err;
          //res.writeHead(200, {'Content-Type':'text-plain'});

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
    evaluations.find({}, function(err, evaluations){
      if(err) throw err;
      res.json(evaluations);
    });
  })
  .post(function(req, res, next){ // adds an evaluation to a specfic project
    evaluations.create(req.body, function(err, evaluation){
      if(err) throw err;

      var id = evaluation._id;
      projects.findById(req.params.projectId, function(err, project){
        if(err) throw err;
        project.evaluations.push(id);
        res.json(id);
        res.end('Added evaluation - id:' + id + " to project - id:" + req.params.projectId);
        project.save(function(err, project){
          if(err) throw err;
          //res.writeHead(200, {'Content-Type':'text-plain'});

        });
      });

    });
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
    evaluations.findByIdAndRemove(req.params.evaluationId, function(err, res){
      if(err) throw err;
      res.json(res);
    })
  });

module.exports = courseRouter;
