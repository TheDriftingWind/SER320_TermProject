var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var evaluationSchema = new Schema({
    name: {type: String},
    startDate: {type: Date, default: Date.now, require: true},
    endDate: {type: Date, default: Date.now, require: true},
    evaluator: { type: Schema.Types.ObjectId, ref: 'student'},
    evaluatee: { type: Schema.Types.ObjectId, ref: 'student'},
    status: { type: Boolean, default: true },
    feedback: {type: String },
    collaboration: {
      type: Number,
      min: 1,
      max: 5,
    },
    contribution: {
      type: Number,
      min: 1,
      max: 5,
    },
    responsive: {
      type: Number,
      min: 1,
      max: 5,
    }
  }, {
    timestamps: true
});

var Evaluations = mongoose.model('evaluation', evaluationSchema);

module.exports = Evaluations;
