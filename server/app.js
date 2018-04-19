var createError = require('http-errors');
var express = require('express');
var jwt = require('jwt-simple');// 4/22 add jwt and _
var _ = require('underscore');
//var async = require("async");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var cors = require('cors');

var courseRoute = require('./routes/courseRoute');
var studentRoute = require('./routes/studentRoute');
var professorRoute = require('./routes/professorRoute');

//models for login
var students = require('./models/student');
var professors = require('./models/professor');

//mongoose data setup
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

// app.use(function(req, res, next) { // Allow CORS
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access_token");
// 	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// 	res.header("Access-Control-Allow-Credentials", "true");
// 	res.header('Content-Type', 'application/json');
// 	next();
// });
app.use(cors({origin: '*'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/api/professorLogin', function(req, res, next){ //authenticates the professor if login is correct
	professors.findOne({email:req.body.email, password: req.body.password}, function(err, professor){
			if(err) throw err;
			//step 1 search the professors collection for the given email and password
			if(!professor){ //if not found, invalid login
				  res.json({'0':"Invalid credentials"});
			}
			else{ //if found, make a token for user
				//creates and sends an access token
				var expires = new Date();
					expires.setDate((new Date()).getDate() + 5);
					var token = jwt.encode({
							id: professor._id,
							expires: expires
					}, app.get('jwtTokenSecret'));

					tokens.push(token); //add token to tokens array

					res.json({ 'access_token': token, 'id': professor._id });//send token to user
			}
	});
//	next()
});

app.post('/api/studentLogin', function(req, res, next){//authenticates the professor if login is correct
	students.findOne({email: req.body.email, password: req.body.password}, function(err, student){
		if(err) throw err; //search for email and password in student collection
		if(!student){ //student login credentials not found...
			//invalid log
			res.json({'0':"Invalid credentials"});
		} else {//student found
			//creates and sends an access token
			var expires = new Date();
      expires.setDate((new Date()).getDate() + 5);
      var token = jwt.encode({
          id: student._id,
          expires: expires
      }, app.get('jwtTokenSecret'));

      tokens.push(token); //add token to the tokens collection

      res.json({ 'access_token': token, 'id': student._id }); //give user the token
		}
	});
//	next()
});

app.post('/api/logout', function(res, req){
	var token= request.headers.access_token;
    removeFromTokens(token);
    response.send(200);
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

    if (request.headers.access_token) { //step 1 Get access_token from header
        var token = request.headers.access_token;
       // console.log(tokens);
		 if (_.where(tokens, token).length > 0) { //step 2 check access_token is in tokens array
     		console.log('Authentication : ');
     		var decodedToken = jwt.decode(token, app.get('jwtTokenSecret'));
            if (new Date(decodedToken.expires) > new Date()) { //step 3 check if token is expired
				console.log('Authentication 2: ');
            	 next(); //if not expired, continue on
                return;
            } else { //if expired, remove token from tokens
                removeFromTokens();
				response.status(401).send("Your session is expired");
            }
        }
    }
	 response.status(401).send('No access token found in the request'); //if not in tokens array, say no access
}

function removeFromTokens(token) { //search for token and remove from tokens array
    for (var counter = 0; counter < tokens.length; counter++) {
        if (tokens[counter] === token) {
            tokens.splice(counter, 1);
            break;
        }
    }
}


module.exports = app;
