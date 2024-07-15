const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://iamsamreenk:eUbUGm8Lr7TqlPfd@cluster0.7n8gkag.mongodb.net/";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected To Mongoose Successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectToMongo;