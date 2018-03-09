var mongoose = require('mongoose'),
 assert = require('assert');

//recipe module variable
var Students = require('./models/student')
var Professors = require('./models/professor')
var Projects = require('./models/project')
var Courses = require('./models/course')
var Evaluations = require('./models/evaluation')

// Connection URL
var url = 'mongodb://localhost:27017/SER';


// Connect using mongoose
mongoose.connect(url);

//open a connection and get a db handler
var db = mongoose.connection;

//error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
    // we're connected!
    console.log("Connected correctly to server");

    // test - create a new student
  Students.create({
      first_name : 'Joe',
      last_name: 'Shmoe',
      email: 'joe.shmoe@quinnipiac.edu',
      password: 'password'
      teamId: '1'
  }, function(err, student){
      if (err) throw err
      console.log('student created: ' + student);
      var joe_id = student._id;
    }
  );
});
  Professors.create({
    first_name: 'Doctor',
    last_name: 'Professor',
    email: 'doctor.professor@quinnipiac.edu',
    password: 'password123'
  }, function(err, professor){
      if(err) throw err
      console.log('professor created: ' + professor);
      var prof_id = professor._id;
    }
  );


db.collection('Students').drop(function(){
  db.close();
});
