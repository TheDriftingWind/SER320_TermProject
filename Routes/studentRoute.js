var express = require('express');
var studentRouter = express.Router();
var students = require('../models/student');

router.route('/')
  .get(function(req, res, next){
    //get a list of all students
  })
  .post(function(req, res, next){
    //make new student account
    students.create(req.body, function(err, student))
  });


router.route('/:id')
  .get(function(req, res, next){
    //get info for a student by ID
  })
  .put(function(req,res, next){
    //update student information
  });

module.exports = studentRouter;
