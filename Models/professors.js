var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var professorSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: {type: String },
    password: {type: String }
  }, {
    timestamps: true
});

var professor = mongoose.model('professor', professorSchema);

module.exports = professor;
