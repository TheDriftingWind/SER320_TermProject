var createError = require('http-errors');
var express = require('express');
var jwt = require('jwt-simple');// 4/22 add jwt and _
var _ = require('underscore');
//var async = require("async");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var courseRoute = require('./routes/courseRoute');
var studentRoute = require('./routes/studentRoute');
//var professorRoute = require('./routes/professorRoute');

//models for login
var students = require('./models/student');
var professors = require('./models/professor');

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


app.post('/api/professorLogin', function(req, res){
	professors.findOne({email:req.body.email, password: req.body.password}, function(err, professor){
			if(err) throw err;

			if(!professor){
				  res.send(401, "Invalid credentials");
			}
			else{
				res.json(professor);
				var expires = new Date();
					expires.setDate((new Date()).getDate() + 5);
					var token = jwt.encode({
							email: email,
							expires: expires
					}, app.get('jwtTokenSecret'));

					tokens.push(token);

					res.send(200, { access_token: token, id: student._id });
			}
	});
});

app.post('/api/studentLogin', function(req, res){
	students.findOne({email: req.body.email, password: req.body.password}, function(err, student){
		if(err) throw err;
		if(!student){
			//invalid log
			res.send(401, "Invalid credentials");
		} else {
			var expires = new Date();
      expires.setDate((new Date()).getDate() + 5);
      var token = jwt.encode({
          email: email,
          expires: expires
      }, app.get('jwtTokenSecret'));

      tokens.push(token);

      res.send(200, { access_token: token, id: student._id });
		}
	});
});

app.post('/api/logout', function(res, req){

});


app.use('/courses', requiresAuthentication, courseRoute);
app.use('/professors', professorRoute);
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


// --Authentication helper functions--
function requiresAuthentication(request, response, next) {

    if (request.headers.access_token) {
        var token = request.headers.access_token;
       // console.log(tokens);
		 if (_.where(tokens, token).length > 0) {
     		console.log('Authentication : ');
     		var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) {
				console.log('Authentication 2: ');
            	 next();
                return;
            } else {
                removeFromTokens();
				response.status(401).send("Your session is expired");
            }
        }
    }
	 response.status(401).send('No access token found in the request');
}

function removeFromTokens(token) {
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            break;
        }
    }
}


module.exports = app;
