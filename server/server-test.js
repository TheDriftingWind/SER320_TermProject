/*
 * Run mongodb server
 * Tests will be logged, view in commond line
 */
var mongoose = require('mongoose'),
 assert = require('assert');

//recipe module variable
var Students = require('./models/student')
var Professors = require('./models/professor')
var Courses = require('./models/course')
var Projects = require('./models/project')
var Evaluations = require('./models/evaluation')


// Connection URL
var url = 'mongodb://localhost:27017/SER';


// Connect using mongoose
mongoose.connect(url);

var db = mongoose.connection;

//error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
    var prof_id;
    var student_id;
    var student_id2;
    var course_id;
    var project_id;
    var evaluation_id;

    /*     Create Tests startDate     */
    // create a new student
    Students.create({
        first_name : 'Joe',
        last_name: 'Shmoe',
        email: 'joe.shmoe@quinnipiac.edu',
        password: 'password',
        teamId: '1'
    }, function(err, student){
        if (err) throw err
        console.log('student created: ' + student);
        student_id = student._id;
      }
    )

    Students.create({
        first_name : 'John',
        last_name: 'Smith',
        email: 'john.smith@quinnipiac.edu',
        password: 'password',
        teamId: '1'
    }, function(err, student){
        if (err) throw err
        console.log('student created: ' + student);
        student_id2 = student._id;
      }
    )

    Professors.create({
      first_name : 'Professor',
      last_name : 'Ruby',
      email: 'doctor.professor@quinnipiac.edu',
      password: 'password123'
    }, function(err, professor){
        if(err) throw err
        console.log('professor created: ' + professor);
        prof_id = professor._id
      }
    )

    Courses.create({
      name: 'Software Arch',
      course_number: 'SER320',
      professor: [mongoose.Types.ObjectId(prof_id)],
      term: 'Spring 2018',
      projects: [],
      students: [mongoose.Types.ObjectId(student_id),
                 mongoose.Types.ObjectId(student_id2)]
    }, function(err, course){
        if(err) throw err
        console.log('course created: ' + course)
        course_id = course._id;
      }
    )

    Projects.create({
      name: 'Milestone 1',
      description: 'Part 1 of term project',
      evaluations: [],
      startDate: '3/1/2018',
      endDate: '3/9/2018'
    }, function(err, project){
        if(err) throw err
        console.log('project created: ' + project)

        project_id = project._id
      }
    )

    Evaluations.create({
      evaluator: mongoose.Types.ObjectId(student_id),
      evaluatee: mongoose.Types.ObjectId(student_id2),
      feedback: 'Good teamwork',
      collaboration: '5',
      contribution: '5',
      responsive: '5'
    }, function(err, evaluation){
        if(err) throw err
        console.log('evaluation created: ' + evaluation)
        evaluation_id = evaluation._id


      }
    )
    /*       Create Test END           */
    /*       Update Test Start          */
    Courses.findByIdAndUpdate(
      course_id,
      {$set:{projects: [mongoose.Types.ObjectId(project_id)]}},
      function(err, course){
        if (err) throw err;
        console.log("Update Course: " + course);
      }
    );

    Projects.findByIdAndUpdate(
    project_id,
      {$set:{evaluations: [mongoose.Types.ObjectId(evaluation_id)]}},
      function(err, course){
        if (err) throw err;
        console.log("Update Course: " + course);
      }
    );
    /*       Delete Test Start        */
    Courses.findByIdAndRemove(
      student_id2,
      function(err, result){
        if(err) throw err
        console.log('Student ' + student_id2 + ' deleted')
      }
    )
    Evaluations.findByIdAndRemove(
      evaluation_id,
      function(err, result){
        if(err) throw err
        console.log('Evaluation ' + evaluation_id + ' deleted')
      }
    )
    /*       Delete Test END        */
    /*      Read Test Start       */
    Students.find(function(err, students){
      console.log(students);
    });
    Professors.find(function(err, professors){
      console.log(professors);
    });
    Courses.find(function(err, courses){
      console.log(courses);
    })
    Projects.find(function(err, projects){
      console.log(projects);
    })
    Evaluations.find(function(err, evaluations){
      console.log(evaluations);
    })

});

db.collection('Professors').drop(function(){})
db.collection('Evaluations').drop(function(){})
db.collection('Courses').drop(function(){})
db.collection('Project').drop(function(){})
db.collection('Students').drop(function(){
  db.close();
});
