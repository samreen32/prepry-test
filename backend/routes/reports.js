const express = require('express');
const router = express.Router();
const User = require('../models/UserAuth');
const Test = require('../models/Tests');
const Question = require('../models/Questions');
const Report = require('../models/Report');
const user_middleware = require("../middleware/user_middleware");

router.post('/createReport', user_middleware, async (req, res) => {
    try {
        const { testId, userId, answers } = req.body;
        const test = await Test.findById(testId);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const questions = await Question.find({ test: testId });
        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this test' });
        }

        let correctAnswers = 0;
        const totalQuestions = questions.length;

        const answersWithQuestionIds = answers.map(({ questionId, answer }) => {
            const question = questions.find(q => q._id.toString() === questionId);
            if (!question) {
                throw new Error(`Question ID ${questionId} not found in test`);
            }
            const isCorrect = question.options[question.correctAnswerIndex] === answer;
            if (isCorrect) correctAnswers++;
            return {
                question: question._id,
                answer,
            };
        });

        const score = (correctAnswers / totalQuestions) * 100;
        let grade = '';

        if (score >= 90) grade = 'A';
        else if (score >= 80) grade = 'B';
        else if (score >= 70) grade = 'C';
        else if (score >= 60) grade = 'D';
        else grade = 'F';
        const newReport = new Report({
            test: testId,
            user: userId,
            answers: answersWithQuestionIds,
            grade,
            score,
            feedback: '',
            attemptDate: new Date(),
            totalQuestions,
            correctAnswers,
            percentage: score,
            createdAt: new Date(),
        });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// New endpoint to get all reports
router.get('/getReports', async (req, res) => {
    try {
        const reports = await Report.find().populate('test').populate('user').populate('answers.question');
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// New endpoint to get a single report by ID
router.get('/specificReport/:id', async (req, res) => {
    try {
        const report = await Report.findById(req.params.id).populate('test').populate('user').populate('answers.question');
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// New endpoint to delete a report by ID
router.delete('/deleteReport/:id', user_middleware, async (req, res) => {
    try {
        const report = await Report.findByIdAndDelete(req.params.id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found' });
        }
        res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// New endpoint to get all reports for a specific user
router.get('/getUserReports/:userId', user_middleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const reports = await Report.find({ user: userId }).populate('test').populate('user').populate('answers.question');
        if (!reports || reports.length === 0) {
            return res.status(404).json({ message: 'No reports found for this user' });
        }
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
});

module.exports = router;
