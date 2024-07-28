const mongoose = require("mongoose");
const { Schema } = mongoose;

// Report Schema
const reportSchema = new Schema({
  test: {
    type: Schema.Types.ObjectId,
    ref: 'Tests',

  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',

  },
  answers: [{
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Questions',

    },
    answer: {
      type: String,

    }
  }],
  grade: {
    type: String,

  },
  score: {
    type: Number,

  },
  feedback: {
    type: String,
  },
  attemptDate: {
    type: Date,

  },
  totalQuestions: {
    type: Number,

  },
  correctAnswers: {
    type: Number,

  },
  percentage: {
    type: Number,

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
