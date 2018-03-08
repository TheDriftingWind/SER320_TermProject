var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    teamId: [{ type: Number }] //students need to be able to add courses to their profile
  }, {
    timestamps: true
});

var student = mongoose.model('student', studentSchema);

module.exports = student;
