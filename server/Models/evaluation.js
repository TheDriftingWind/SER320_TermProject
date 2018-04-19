var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var evaluationSchema = new Schema({
    evaluator: { type: Schema.Types.ObjectId, ref: 'student'},
    evaluatee: { type: Schema.Types.ObjectId, ref: 'student'},
    status: { type: Boolean },
    feedback: {type: String },
    collaboration: {
      type: Number,
      min: 1,
      max: 5,
      require : true
    },
    contribution: {
      type: Number,
      min: 1,
      max: 5,
      require : true
    },
    responsive: {
      type: Number,
      min: 1,
      max: 5,
      require : true
    }
  }, {
    timestamps: true
});

var Evaluations = mongoose.model('evaluation', evaluationSchema);

module.exports = Evaluations;
