import express from "express";
const router = express.Router();

import multer from "multer";
import path from "path";
import fs from "fs";
import Groq from "groq-sdk";
import { fileURLToPath } from "url";

import { AINotes } from "../db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Groq Client (replaces OpenAI)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ─── Multer Storage Config ─────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads/videos");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: (req, file, cb) => {
    const allowed = /mp4|mkv|mov|avi|webm/i;
    const ext = path.extname(file.originalname);
    if (allowed.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed (mp4, mkv, mov, avi, webm)."));
    }
  },
});

// ─── Helper: Transcribe Video with Groq Whisper ───────────────
async function transcribeVideo(videoPath) {
  const stream = fs.createReadStream(videoPath);

  const transcription = await groq.audio.transcriptions.create({
    file: stream,
    model: "whisper-large-v3",   // ✅ Groq's free Whisper model
    response_format: "text",
  });

  return transcription;
}

// ─── Helper: Generate Notes with Groq LLaMA ──────────────────
async function generateNotes(transcript, userPrompt) {
  const systemPrompt = `You are an expert video content analyst.
Analyze the video transcript and generate structured notes based on the user's request.
You MUST respond with ONLY a valid JSON object — no markdown, no backticks, no explanation.
Use this exact structure:
{
  "title": "Brief title for these notes",
  "summary": "2-3 sentence executive summary",
  "keyPoints": ["point 1", "point 2"],
  "detailedNotes": [
    { "heading": "Section heading", "content": "Detailed explanation" }
  ],
  "actionItems": ["actionable item 1"],
  "tags": ["relevant", "tags"]
}`;

  const userMessage = `VIDEO TRANSCRIPT:
${transcript}

USER'S REQUEST:
${userPrompt}

Generate comprehensive notes based on the transcript and my specific request above.`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",  // ✅ Groq's free LLaMA model
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    temperature: 0.4,
    max_tokens: 2048,
    response_format: { type: "json_object" }, // ✅ Groq supports this
  });

  const raw = response.choices[0].message.content;

  // Strip accidental markdown fences just in case
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}

// ─── POST /generate ───────────────────────────────────────────
router.post("/generate", upload.single("video"), async (req, res) => {
  const videoPath = req.file?.path;

  try {
    const { prompt, videoTitle } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No video file uploaded." });
    }
    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required." });
    }

    // Step 1: Transcribe
    const transcript = await transcribeVideo(videoPath);

    if (!transcript || transcript.trim() === "") {
      return res.status(422).json({
        error: "No speech detected in the video. Please ensure it has clear audio.",
      });
    }

    // Step 2: Generate notes
    const notesData = await generateNotes(transcript, prompt.trim());

    // Step 3: Save to MongoDB
    const saved = await AINotes.create({
      videoTitle: videoTitle || req.file.originalname,
      videoFileName: req.file.filename,
      videoPath: req.file.path,
      prompt: prompt.trim(),
      transcript,
      notes: notesData,
    });

    // Clean up uploaded video
    fs.unlink(videoPath, () => {});

    return res.status(201).json({
      success: true,
      message: "Notes generated successfully!",
      data: saved,
    });

  } catch (err) {
    if (videoPath && fs.existsSync(videoPath)) fs.unlink(videoPath, () => {});

    console.error("AI Notes Error:", err);

    // ✅ Groq-specific error handling
    if (err?.status === 429) {
      return res.status(429).json({
        error: "Groq rate limit reached. Please wait a moment and try again.",
      });
    }

    if (err?.status === 401) {
      return res.status(401).json({
        error: "Invalid Groq API key. Check your GROQ_API_KEY environment variable.",
      });
    }

    if (err?.message?.includes("file size") || err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ error: "File too large. Max size is 500MB." });
    }

    return res.status(500).json({
      error: err.message || "Internal server error while generating notes.",
    });
  }
});

// ─── GET / (all notes, paginated) ────────────────────────────
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [notes, total] = await Promise.all([
      AINotes.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-transcript -videoPath"),
      AINotes.countDocuments(),
    ]);

    res.json({
      success: true,
      data: notes,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── GET /:id ─────────────────────────────────────────────────
router.get("/:id", async (req, res) => {
  try {
    const note = await AINotes.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found." });
    res.json({ success: true, data: note });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── DELETE /:id ──────────────────────────────────────────────
router.delete("/:id", async (req, res) => {
  try {
    const note = await AINotes.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found." });
    res.json({ success: true, message: "Note deleted." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;