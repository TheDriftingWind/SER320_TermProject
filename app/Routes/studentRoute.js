var express = require('express');
var studentRouter = express.Router();
var students = require('../models/student');
var mongoose = require('mongoose');

studentRouter.route('/')
  .get(function(req, res, next){
    students.find({}, function(err, courses){
      if(err) throw err;
      res.json(students);
    });
    })
  .post(function(req, res, next){
    //make new student account
    students.create(req.body, function(err, student){
         if(err)
            throw err;
        res.end('Student '+student._id+' has been registered');
    });

  });


studentRouter.route('/:studentId')
  .get(function(req, res, next){
    students.findById(req.params.studentId, function(err, course){
        if(err)
            throw err;

        res.json(course);
    });
  })
  .put(function(req,res, next){
    //update student information
    student.findByIdAndUpdate(req.params.studentId, {
      $set:req.body //assuming body contains the update which it will if getting from form
      //Step 1 - find project and update it
    },{
      new: true
    }, function(err, student){
        if(err) throw err;
        res.json(student._id)
    })
  });

module.exports = studentRouter;
