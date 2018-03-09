var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    password: { type: String },
    teamId: { type: Number }
  }, {
    timestamps: true
});

var Students = mongoose.model('student', studentSchema);

module.exports = Students;
