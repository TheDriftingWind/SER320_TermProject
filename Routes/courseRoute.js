var express = require('express');
var router = express.Router();
var courses = require('../models/course');

router.get('/:id', function(req, res, next) { //get a course by its ID

});

router.route('/')
  .post(function(req, res, next) { //prof. make a new course (Req 5.2)

  })
  .put(function(req, res, next){ //update course(add students etc...) (Req 5.4)

  });

router.route('/:id/team')
  .post(function(req, res, next){
    //create new team under specific course (Req 5.3)
  })
  .get(function(req, res, next){
    //get all the teams
  })

router.route('/:id/project')
  .get(function(req, res, next){

  })
  .post(function(req, res, next){
    //create project under a specific course (Req 5.5)
  });

router.route('/:id/project/:id/sessions')
  .get(function(req, res, next){
    //get eval sessions to view (Req 5.9)
  })
  .post(function(req, res, next){
    //make new eval session (Req. 5.6)
  });

router.route('/:id/project/:id/sessions/:id/evaluation')
  .get(function(req, res, next){
    //get eval sessions to view (Req 5.12, 5.13)
  })
  .put(function(req, res, next){
    //update and save evaluations
  })
  .post(function(req, res, next){
    //make new eval (Req. 5.10)
  });
module.exports = router;
