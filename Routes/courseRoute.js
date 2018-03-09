var express = require('express');
var router = express.Router();
var courses = require('../models/course');

var mongoose = require('mongoose');

router.get('/:id', function(req, res, next) { //get a course by its ID

});

router.route('/')
  .get(function(req, res, next){
    courses.find({}, function(err, course){
      if(err) throw err;
      res.json(course);
    })
  })
  .post(function(req, res, next) { //prof. make a new course (Req 5.2)
    courses.create()
  });

router.route('/:courseId')
  .get(function(req, res, next){

  })
  .post(function(req, res, next){

  });

router.route('/:courseId/students')
  .get(function(req, res, next){

  })
  .post(function(req, res, next){

  });

router.route('/:courseId/students/:studentId')
  .get(function(req, res, next){

  })
  .delete(function(req, res, next){

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
