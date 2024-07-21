const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const user_middleware = require("../middleware/user_middleware");

// Create a new note
router.post('/createNotes', user_middleware, async (req, res) => {
    const { user, noteTitle, noteDescription } = req.body;

    try {
        const newNote = new Note({
            user,
            noteTitle,
            noteDescription
        });

        const savedNote = await newNote.save();
        res.status(201).json({ success: true, note: savedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Get all notes
router.get('/fetchNotes', async (req, res) => {
    try {
        const notes = await Note.find().populate('user', 'name email');
        res.status(200).json({ success: true, notes });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Get a single note by ID
router.get('/notes/:id', user_middleware, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate('user', 'name email');
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }
        res.status(200).json({ success: true, note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Update a note by ID
router.put('/notes/:id', user_middleware, async (req, res) => {
    const { noteTitle, noteDescription } = req.body;

    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        note.noteTitle = noteTitle || note.noteTitle;
        note.noteDescription = noteDescription || note.noteDescription;

        const updatedNote = await note.save();
        res.status(200).json({ success: true, note: updatedNote });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Delete a note by ID
router.delete('/deleteNote/:id', user_middleware, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Note deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;
