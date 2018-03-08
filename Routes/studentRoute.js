var express = require('express');
var router = express.Router();
var courses = require('../models/course');

router.route('/')
  .get(function(req, res, next){
    //get a list of all students
  })
  .post(function(req, res, next){
    //make new student account
  });


router.route('/:id')
  .get(function(req, res, next){
    //get info for a student by ID
  })
  .put(function(req,res, next){
    //update student information
  });
