var express = require('express');
var professorRouter = express.Router();
var professors = require('../models/professor');
var mongoose = require('mongoose');

professorRouter.route('/')
  .get(function(req, res, next){
    //get a list of all professors
    professors.find({},function(err, professors){
        if(err) throw err;
        res.json(professors);
    });
        
    })
  .post(function(req, res, next){
    //make new professor account
    professors.create(req.body, function(err, professor){
      if(err) throw err;
      res.end('Professor '+professor._id+' has been added');
    });
  });


professorRouter.route('/:professorId')
  .get(function(req, res, next){
    //get info for a student by ID
     professors.findById(req.params.professorId, function(err, professor){
        if(err)
            throw err;

        res.json(professor);
    });
  })
  .put(function(req,res, next){
    //update student information
    professors.findByIdAndUpdate(req.params.professorId,
                              {$set: req.body}, {new : true}, function(err, professor){
        if(err) throw err;
        res.json(professor);
    });
  });

module.exports = professorRouter;
