const mongoose = require("mongoose");
const { Schema } = mongoose;

const adminSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Admins = mongoose.model("Admins", adminSchema);
module.exports = Admins;
