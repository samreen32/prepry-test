const mongoose = require("mongoose");
const { Schema } = mongoose;

const practiceQsSchema = new Schema({
    practiceTitle: {
        type: String,
        required: true,
    },
    practiceOptions: {
        type: [String],
        required: true,
    },
    correctPracticeAnswerIndex: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PracticeQuestion = mongoose.model("PracticeQuestion", practiceQsSchema);
module.exports = PracticeQuestion;
