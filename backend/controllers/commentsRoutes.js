





import express from "express";
import { commentModel } from "../db.js";

const router = express.Router();

// ── Get all comments for a video ──────────────────────────────────────────────
router.get("/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await commentModel.find({ videoId });
    res.json(comments || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Add a comment ─────────────────────────────────────────────────────────────
router.post("/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { x, y, text, startTime, endTime } = req.body;
    const comment = await commentModel.create({ videoId, x, y, text, startTime, endTime });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Delete a comment ──────────────────────────────────────────────────────────
// NOTE: specific route /:commentId — must NOT conflict with /:videoId above
// We use /delete/:commentId to avoid ambiguity
router.delete("/delete/:commentId", async (req, res) => {
  try {
    await commentModel.findByIdAndDelete(req.params.commentId);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;