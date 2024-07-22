const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  test: {
    type: Schema.Types.ObjectId,
    ref: 'Tests',
    required: true,
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Questions',
    required: true,
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
