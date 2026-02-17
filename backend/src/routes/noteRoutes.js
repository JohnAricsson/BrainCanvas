import express from "express";
import Note from "../models/Note.js";
import authenticate from "../middleware/authenticate.js"; // middleware to verify JWT

const router = express.Router();

// Get all notes for logged-in user
router.get("/me", authenticate, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notes" });
  }
});

// Create a new note
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
      tags,
    });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to create note" });
  }
});

// Update a note
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { title, content, tags, isPinned } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, content, tags, isPinned },
      { new: true },
    );
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to update note" });
  }
});

// Delete a note
router.delete("/:id", authenticate, async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete note" });
  }
});

export default router;
