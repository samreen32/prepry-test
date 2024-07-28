const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
    test: {
        type: Schema.Types.ObjectId,
        ref: 'Tests',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    correctAnswerIndex: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Question = mongoose.model("Questions", questionSchema);
module.exports = Question;