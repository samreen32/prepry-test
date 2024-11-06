const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const user_middleware = require("../middleware/user_middleware");
const admin_middleware = require("../middleware/admin_middleware");

router.post('/createNotifi', async (req, res) => {
    try {
        const { user, notifiTitle, notifiDescription } = req.body;
        const newNotification = new Notification({
            user,
            notifiTitle,
            notifiDescription,
        });
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get notifications for a user
router.get('/getNotifi/:userId', user_middleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.params.userId, type: 'user' });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get notifications for an admin
router.get('/getAdminNotifi/:adminId', admin_middleware, async (req, res) => {
    try {
        const notifications = await Notification.find({ admin: req.params.adminId, type: 'admin' });
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Endpoint to delete a notification
router.delete('/deleteNotifi/:id', user_middleware, async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification.findByIdAndDelete(id);
        if (!notification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }
        res.status(200).json({ success: true, message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;