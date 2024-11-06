const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const PracticeQuestion = require("../models/PracticeQs");
const Notification = require("../models/Notification");
const admin_middleware = require("../middleware/admin_middleware");

// Create Practice Question Route
router.post(
    "/createPracticeQs",
    admin_middleware,
    [
        body("practiceTitle").notEmpty().withMessage("Practice question title is required"),
        body("practiceOptions")
            .isArray({ min: 1 })
            .withMessage("Practice question options must be an array with at least one option"),
        body("correctPracticeAnswerIndex")
            .isInt({ min: 0 })
            .withMessage("Correct practice answer index must be an integer and should be a valid index in the options array"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { practiceTitle, practiceOptions, correctPracticeAnswerIndex } = req.body;

        if (correctPracticeAnswerIndex >= practiceOptions.length) {
            return res.status(400).json({ success: false, message: "Correct practice answer index is out of bounds" });
        }

        try {
            const practiceQuestion = new PracticeQuestion({ practiceTitle, practiceOptions, correctPracticeAnswerIndex });
            await practiceQuestion.save();

            // Create notification
            const notificationTitle = 'Practice Question Created';
            const notificationDescription = `A new practice question titled "${practiceTitle}" has been created.`;

            const newNotification = new Notification({
                admin: req.admin.id,
                notifiTitle: notificationTitle,
                notifiDescription: notificationDescription,
                type: 'admin'
            });

            await newNotification.save();

            res.status(201).json({
                success: true,
                message: "Practice question created successfully",
                practiceQuestion,
                notification: newNotification
            });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);


// Get All Practice Questions Route
router.get("/fetchPracticeQs", async (req, res) => {
    try {
        const practiceQuestions = await PracticeQuestion.find();
        res.status(200).json({ success: true, practiceQuestions });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Delete Practice Question Route
router.delete("/deletePracticeQs/:id", admin_middleware, async (req, res) => {
    try {
        const practiceQuestion = await PracticeQuestion.findByIdAndDelete(req.params.id);
        if (!practiceQuestion) {
            return res.status(404).json({ success: false, message: "Practice question not found" });
        }
        res.status(200).json({ success: true, message: "Practice question deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Update Practice Question Route
router.put(
    "/updatePracticeQs/:id",
    admin_middleware,
    [
        body("practiceTitle").notEmpty().withMessage("Practice question title is required"),
        body("practiceOptions")
            .isArray({ min: 1 })
            .withMessage("Practice question options must be an array with at least one option"),
        body("correctPracticeAnswerIndex")
            .isInt({ min: 0 })
            .withMessage("Correct practice answer index must be an integer and should be a valid index in the options array"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { practiceTitle, practiceOptions, correctPracticeAnswerIndex } = req.body;

        if (correctPracticeAnswerIndex >= practiceOptions.length) {
            return res.status(400).json({ success: false, message: "Correct practice answer index is out of bounds" });
        }

        try {
            const practiceQuestion = await PracticeQuestion.findByIdAndUpdate(
                req.params.id,
                { practiceTitle, practiceOptions, correctPracticeAnswerIndex },
                { new: true }
            );

            if (!practiceQuestion) {
                return res.status(404).json({ success: false, message: "Practice question not found" });
            }

            res.status(200).json({ success: true, message: "Practice question updated successfully", practiceQuestion });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);

module.exports = router;
