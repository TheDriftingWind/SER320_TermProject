var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var projectSchema = new Schema({
    name: { type: String },
    description: {type: String },
    evaluations : [{type: Schema.Types.ObjetId, ref: 'evaluation'}],
    startDate: {type: Date},
    endDate: {type: Date}
  }, {
    timestamps: true
});

var Projects = mongoose.model('project', projectSchema);

module.exports = Projects;
