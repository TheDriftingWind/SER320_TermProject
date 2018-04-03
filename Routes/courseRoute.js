var express = require('express');
var courseRouter = express.Router();
var courses = require('../models/course');
var projects = require('../models/project');
var evaluations = require('../models/evaluation');

var mongoose = require('mongoose');

router.route('/')
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
        
        res.writeHead(200, {'Content/Type': 'text-plain'});
        res.end('Course '+course._id+' has been created');
        })
  });

router.route('/:courseId')
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

router.route('/:courseId/students')
  .get(function(req, res, next){
    courses.findById(req.params.courseId, function(err, course){
        if(err) throw err;
        res.json(course.students);
    })
  })
  .post(function(req, res, next){
    courses.findById(req.params.courseId, function(err,course){
        if (err) throw err;
        course.students.push(req.body);
        courses.save(function(err,course){
            res.json(course);
        })
    })
  });

router.route('/:courseId/students/:studentId')
  .get(function(req, res, next){
     courses.findById(req.params.courseId, function(err, course){
        if(err)
            throw err;
        
    course.students.findById(req.params.studentId, function(err, student){
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

router.route('/:courseId/project')
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
        course.save(function(err, recipe){
          if(err) throw err;
          res.writeHead(200, {'Content-Type':'text-plain'});
          res.json(project);
          res.end('Added project - id:' + id + " to course - id:" + req.params.courseId);
        });
      }
    })
  });

router.route('/:courseId/project/:projectId')
  .get(function(req, res, next){
    projects.findById(req.params.projectId, function(err, project){
      if(err) throw err;
      res.json(recipe);
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

router.route('/:courseId/project/:projectId/evaluations')
  .get(function(req, res, next){

  })
  .post(function(req, res, next){

  });

router.route('/:courseId/project/:projectId/evaluations/:evaluationId')
  .get(function(req, res, next){

  })
  .put(function(req, res, next){

  })
  .delete(function(req, res, next){

  });

module.exports = courseRouter;
