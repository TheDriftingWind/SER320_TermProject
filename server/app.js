var createError = require('http-errors');
var express = require('express');
var jwt = require('jwt-simple'),// 4/22 add jwt and _
//var _ = require('underscore');
//var async = require("async");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var courseRoute = require('./routes/courseRoute');
var studentRoute = require('./routes/studentRoute');
//var professorRoute = require('./routes/professorRoute');

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/PEWA';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	console.log('Connected to MongoDB');
})
var app = express();

app.set('jwtTokenSecret', '123456ABCDEF'); //token authentication
var tokens = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/courses', courseRoute);
//app.use('/professors', professorRoute);
app.use('/students', studentRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
