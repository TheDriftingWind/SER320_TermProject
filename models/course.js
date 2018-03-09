var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var courseSchema = new Schema({
    name: { type: String },
    course_number: { type: String },
    professor: [{type: Schema.Types.ObjectId, ref: 'professor'}],
    term: {type: String },
    projects: [{Schema.Types.ObjectId, ref: 'project'}],
    students: [{type: Schema.Types.ObjectId, ref: 'student'}]
    }, {
    timestamps: true
});

var Courses = mongoose.model('course', courseSchema);

module.exports = Courses;
