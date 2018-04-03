var express = require('express');
var router = express.Router();
var courses = require('../models/course');

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

  })
  .post(function(req, res, next){

  });

router.route('/:courseId/project/:projectId')
  .get(function(req, res, next){

  })
  .put(function(req, res, next){

  })
  .delete(function(req, res, next){

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

module.exports = router;
