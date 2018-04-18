var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    course: {type: Schema.Types.ObjectId, ref: 'course'},
    students: [{ type: Schema.Types.ObjectId, ref: 'student'}],
    teamName: {type: String}
  }, {
    timestamps: true
});

var Teams = mongoose.model('team', teamSchema);

module.exports = Teams;
