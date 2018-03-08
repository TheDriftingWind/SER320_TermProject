var mongoose = require('mongoose'),
    assert = require('assert');

//recipe module variable
var Recipes = require('./models/course')
// Connection URL
var url = 'mongodb://localhost:27017/quKitchen';


// Connect using mongoose
mongoose.connect(url);
//open a connection and get a db handler
var db = mongoose.connection;
//error handling
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");



        db.collection('course').drop(function(){
        db.close();
        });

        }); //id, what you want to set
      }, 3000);

});
