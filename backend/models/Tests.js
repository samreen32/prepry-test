const mongoose = require("mongoose");
const { Schema } = mongoose;

const testsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Tests = mongoose.model("Tests", testsSchema);
module.exports = Tests;
