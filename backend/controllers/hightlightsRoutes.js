// import express from "express";
// import { highlightModel } from "../db.js";

// const router = express.Router();

// // ── Get all highlights for a video ────────────────────────────────────────────
// router.get("/:videoId", async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const doc = await highlightModel.find({ videoId });
//     res.json(doc || []);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Add a highlight ───────────────────────────────────────────────────────────
// router.post("/:videoId", async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const { start, end, color, label } = req.body;
//     const h = await highlightModel.create({ videoId, start, end, color, label });
//     res.status(201).json(h);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Delete a highlight by index (simple) ─────────────────────────────────────
// router.delete("/:videoId/:highlightId", async (req, res) => {
//   try {
//     const { highlightId } = req.params;
//     await highlightModel.findByIdAndDelete(highlightId);
//     res.json({ message: "Highlight deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;






import express from "express";
import { highlightModel } from "../db.js";

const router = express.Router();

// ── Get all highlights for a video ────────────────────────────────────────────
router.get("/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const doc = await highlightModel.find({ videoId });
    res.json(doc || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Add a highlight ───────────────────────────────────────────────────────────
router.post("/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const { start, end, color, label } = req.body;
    const h = await highlightModel.create({ videoId, start, end, color, label });
    res.status(201).json(h);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Delete a highlight ────────────────────────────────────────────────────────
router.delete("/:videoId/:highlightId", async (req, res) => {
  try {
    const { highlightId } = req.params;
    await highlightModel.findByIdAndDelete(highlightId);
    res.json({ message: "Highlight deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;