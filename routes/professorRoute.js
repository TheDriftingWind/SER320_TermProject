var express = require('express');
var professorRouter = express.Router();
var professors = require('../models/professor');
var mongoose = require('mongoose');

professorRouter.route('/')
  .get(function(req, res, next){
    //get a list of all students
  })
  .post(function(req, res, next){
    //make new student account
    professors.create(req.body, function(err, professor){
      if(err) throw err;
      res.end('Course '+professor._id+' has been created');
    });
  });


professorRouter.route('/:id')
  .get(function(req, res, next){
    //get info for a student by ID
  })
  .put(function(req,res, next){
    //update student information
  });

module.exports = professorRouter;
