const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Question = require("../models/Questions");
const Notification = require("../models/Notification");
const admin_middleware = require("../middleware/admin_middleware");

// Create Question Route
router.post(
    "/createQs",
    admin_middleware,
    [
        body("title").notEmpty().withMessage("Question title is required"),
        body("options")
            .isArray({ min: 1 })
            .withMessage("Question options must be an array with at least one option"),
        body("correctAnswerIndex")
            .isInt({ min: 0 })
            .withMessage("Correct answer index must be an integer and should be a valid index in the options array"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, options, correctAnswerIndex, test } = req.body;
        if (correctAnswerIndex >= options.length) {
            return res.status(400).json({ success: false, message: "Correct answer index is out of bounds" });
        }

        try {
            const question = new Question({ title, options, correctAnswerIndex, test });
            await question.save();

            // Create notification
            const notificationTitle = 'Question Created';
            const notificationDescription = `A new question titled "${title}" has been created.`;

            const newNotification = new Notification({
                admin: req.admin.id,
                notifiTitle: notificationTitle,
                notifiDescription: notificationDescription,
                type: 'admin'
            });

            await newNotification.save();
            res.status(201).json({
                success: true,
                message: "Question created successfully",
                question,
                notification: newNotification
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);

// Get All Questions Route
router.get("/fetchQs", async (req, res) => {
    try {
        const questions = await Question.find().populate('test', 'title');
        res.status(200).json({ success: true, questions });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Get Questions by Test ID
router.get('/fetchQuestionsByTest/:testId', async (req, res) => {
    try {
        const { testId } = req.params;
        const questions = await Question.find({ test: testId });
        res.status(200).json({ success: true, questions });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Delete Question Route
router.delete("/deleteQs/:id", admin_middleware, async (req, res) => {
    try {
        const question = await Question.findByIdAndDelete(req.params.id);
        if (!question) {
            return res.status(404).json({ success: false, message: "Question not found" });
        }

        // Create notification
        const notificationTitle = 'Question Deleted';
        const notificationDescription = `The question titled "${question.title}" has been deleted.`;

        const newNotification = new Notification({
            admin: req.admin.id,
            notifiTitle: notificationTitle,
            notifiDescription: notificationDescription,
            type: 'admin'
        });

        await newNotification.save();
        res.status(200).json({
            success: true,
            message: "Question deleted successfully",
            notification: newNotification
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Update Question Route
router.put(
    "/updateQs/:id",
    admin_middleware,
    [
        body("title").notEmpty().withMessage("Question title is required"),
        body("options")
            .isArray({ min: 1 })
            .withMessage("Question options must be an array with at least one option"),
        body("correctAnswerIndex")
            .isInt({ min: 0 })
            .withMessage("Correct answer index must be an integer and should be a valid index in the options array"),
        body("test").notEmpty().withMessage("Test reference is required"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, options, correctAnswerIndex, test } = req.body;

        if (correctAnswerIndex >= options.length) {
            return res.status(400).json({ success: false, message: "Correct answer index is out of bounds" });
        }

        try {
            const question = await Question.findByIdAndUpdate(
                req.params.id,
                { title, options, correctAnswerIndex, test },
                { new: true }
            );

            if (!question) {
                return res.status(404).json({ success: false, message: "Question not found" });
            }

            res.status(200).json({ success: true, message: "Question updated successfully", question });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);

module.exports = router;