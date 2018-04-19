var createError = require('http-errors');
var express = require('express');
var jwt = require('jwt-simple');// 4/22 add jwt and _
var _ = require('underscore');
//var async = require("async");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var cors = require('cors');

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

//app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) { // Allow CORS
  //res.header("Access-Control-Allow-Origin", "localhost:3000");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // res.header('Access-Control-Allow-Headers', 'Content-Type');
	//res.header('Access-Control-Allow-Origin: *');
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
	// res.header('Access-Control-Request-Headers: Accept, X-Requested-With');
	res.header("Access-Control-Allow-Credentials", "true");
	res.header('Content-Type', 'application/json');
	// res.header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, token");
	//res.status(200);
  next();
});

// app.use(function(req, res, next) {
//     var oneof = false;
//     if(req.headers.origin) {
//         res.header('Access-Control-Allow-Origin', req.headers.origin);
//         oneof = true;
//     }
//     if(req.headers['access-control-request-method']) {
//         res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
//         oneof = true;
//     }
//     if(req.headers['access-control-request-headers']) {
//         res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
//         oneof = true;
//     }
//     if(oneof) {
//         res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
//     }
//
//     // intercept OPTIONS method
//     if (oneof && req.method == 'OPTIONS') {
//         res.send(200);
//     }
//     else {
//         next();
//     }
// });

app.post('/api/professorLogin', function(req, res){ //authenticates the professor if login is correct
	professors.findOne({email:req.body.email, password: req.body.password}, function(err, professor){
			if(err) throw err;
			//step 1 search the professors collection for the given email and password
			if(!professor){ //if not found, invalid login
				  res.send(401, "Invalid credentials");
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

					res.send(200, { access_token: token, id: professor._id });//send token to user
			}
	});
});

app.post('/api/studentLogin', function(req, res){//authenticates the professor if login is correct
	students.findOne({email: req.body.email, password: req.body.password}, function(err, student){
		if(err) throw err; //search for email and password in student collection
		if(!student){ //student login credentials not found...
			//invalid log
			res.send(401, "Invalid credentials");
		} else {//student found
			//creates and sends an access token
			var expires = new Date();
      expires.setDate((new Date()).getDate() + 5);
      var token = jwt.encode({
          id: student._id,
          expires: expires
      }, app.get('jwtTokenSecret'));

      tokens.push(token); //add token to the tokens collection

      res.send(200, { access_token: token, id: student._id }); //give user the token
		}
	});
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
