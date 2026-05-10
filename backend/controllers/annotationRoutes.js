// import express from "express";
// import { annotationModel } from "../db.js";
// import { notesModel } from "../db.js";
// const router = express.Router();

// router.post("/create", async (req, res) => {
//     try {
//         const { videoId,annotations }=req.body;
//         let annotationDoc = await annotationModel.findOneAndUpdate(
//             { videoId },
//             { $push : { annotations: { $each: annotations} }},
//             { new :true,upsert:true}
//         );
//         res.status(201).json(annotationDoc);
//     }
//     catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err.message })
//     }
// });
// router.get("/:videoId", async (req, res) => {
//     try {
//         const { videoId } = req.params;
//         const annotations = await annotationModel.findOne({ videoId });
//         res.status(200).json({ annotations });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }


// });
// router.get("/time/:videoId",async (req,res)=>{
//     try{
//         const videoId = req.params.videoId;
//         const startTime = parseFloat(req.query.startTime);
//         const endTime = parseFloat(req.query.endTime);

//         const annotations = await annotationModel.findOne({ videoId });
//         if(!annotations) console.log("No annotaions found for this video");
//         if(!annotations) return res.status(200).json({ annotations : []});
//         if(!annotations) console.log("No annotaions found for this video");
//         const filteredAnnotaions = annotations.annotations.filter(annotaion => annotaion.startTime <= endTime && annotaion.endTime >= startTime);
//         res.status(200).json({ annotations : filteredAnnotaions });
//     }
//     catch(err){
//         res.status(500).json({ error:err.message });
//         console.log("catch block error");
//     }
// });
// router.get("/getNotes/:videoId",async (req,res) => {
//     const { videoId } = req.params;
//    const { start,end }  = req.query;
//    console.log(start);
//    console.log(end);
//     console.log("videoId-",videoId,"start-",start,"end-",end);
//     const note = await notesModel.findOne({
//         videoId,
//         start:start,
//         end:end
//     });
//     res.json(note || null);
// });
// router.post("/saveNotes", async (req, res) => {
//   try {
//     const { videoId, start, end, content } = req.body;
//     const note = await notesModel.findOneAndUpdate(
//       { videoId, start, end },
//       { content },
//       { new: true, upsert: true }
//     );
//     res.json(note);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });
// router.get("/getAllNotes/:videoId",async (req,res) => {
//     const { videoId } = req.params;
//     const notes = await notesModel.find({
//         videoId
//     });
//     res.json(notes);
// })
// export default router;



// import express from "express";
// import { annotationModel, notesModel } from "../db.js";

// const router = express.Router();

// // ── Create annotations ────────────────────────────────────────────────────────
// router.post("/create", async (req, res) => {
//   try {
//     const { videoId, annotations } = req.body;
//     const doc = await annotationModel.findOneAndUpdate(
//       { videoId },
//       { $push: { annotations: { $each: annotations } } },
//       { new: true, upsert: true }
//     );
//     res.status(201).json({ annotations: doc.annotations });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Get all annotations for a video ──────────────────────────────────────────
// router.get("/:videoId", async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const annotations = await annotationModel.findOne({ videoId });
//     res.status(200).json({ annotations });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Get annotations for a time range ─────────────────────────────────────────
// router.get("/time/:videoId", async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const startTime = parseFloat(req.query.startTime);
//     const endTime = parseFloat(req.query.endTime);
//     const doc = await annotationModel.findOne({ videoId });
//     if (!doc) return res.status(200).json({ annotations: [] });
//     const filtered = doc.annotations.filter(
//       a => a.startTime <= endTime && a.endTime >= startTime
//     );
//     res.status(200).json({ annotations: filtered });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Delete a single annotation ────────────────────────────────────────────────
// router.delete("/:videoId/:annotationId", async (req, res) => {
//   try {
//     const { videoId, annotationId } = req.params;
//     const doc = await annotationModel.findOneAndUpdate(
//       { videoId },
//       { $pull: { annotations: { _id: annotationId } } },
//       { new: true }
//     );
//     res.status(200).json({ annotations: doc?.annotations || [] });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Delete all annotations for a video ───────────────────────────────────────
// router.delete("/:videoId", async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     await annotationModel.findOneAndUpdate({ videoId }, { $set: { annotations: [] } });
//     res.status(200).json({ message: "All annotations cleared" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Get notes for specific time range ────────────────────────────────────────
// router.get("/getNotes/:videoId", async (req, res) => {
//   const { videoId } = req.params;
//   const { start, end } = req.query;

//   if (start !== undefined && end !== undefined) {
//     const note = await notesModel.findOne({
//       videoId,
//       start: parseFloat(start),
//       end: parseFloat(end),
//     });
//     return res.json(note || null);
//   }

//   // No range specified – return all
//   const notes = await notesModel.find({ videoId });
//   res.json(notes || []);
// });

// // ── Get ALL notes for a video ─────────────────────────────────────────────────
// router.get("/getAllNotes/:videoId", async (req, res) => {
//   try {
//     const { videoId } = req.params;
//     const notes = await notesModel.find({ videoId });
//     res.json(notes || []);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ── Save / update a note ──────────────────────────────────────────────────────
// router.post("/saveNotes", async (req, res) => {
//   try {
//     const { videoId, start, end, content } = req.body;
//     const note = await notesModel.findOneAndUpdate(
//       { videoId, start: parseFloat(start), end: parseFloat(end) },
//       { content },
//       { new: true, upsert: true }
//     );
//     res.json(note);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });

// // ── Delete a note ─────────────────────────────────────────────────────────────
// router.delete("/notes/:noteId", async (req, res) => {
//   try {
//     const { noteId } = req.params;
//     await notesModel.findByIdAndDelete(noteId);
//     res.json({ message: "Note deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;





import express from "express";
import { annotationModel, notesModel } from "../db.js";

const router = express.Router();

// ── Create annotations ────────────────────────────────────────────────────────
router.post("/create", async (req, res) => {
  try {
    const { videoId, annotations } = req.body;
    const doc = await annotationModel.findOneAndUpdate(
      { videoId },
      { $push: { annotations: { $each: annotations } } },
      { new: true, upsert: true }
    );
    res.status(201).json({ annotations: doc.annotations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ── IMPORTANT: specific sub-routes MUST come before /:videoId ─────────────────

// ── Get notes for a specific time range ──────────────────────────────────────
router.get("/getNotes/:videoId", async (req, res) => {
  const { videoId } = req.params;
  const { start, end } = req.query;

  if (start !== undefined && end !== undefined) {
    const note = await notesModel.findOne({
      videoId,
      start: parseFloat(start),
      end:   parseFloat(end),
    });
    return res.json(note || null);
  }

  // No range — return all
  const notes = await notesModel.find({ videoId });
  res.json(notes || []);
});

// ── Get ALL notes for a video ─────────────────────────────────────────────────
router.get("/getAllNotes/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const notes = await notesModel.find({ videoId });
    res.json(notes || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Save / update a note ──────────────────────────────────────────────────────
router.post("/saveNotes", async (req, res) => {
  try {
    const { videoId, start, end, content } = req.body;
    const note = await notesModel.findOneAndUpdate(
      { videoId, start: parseFloat(start), end: parseFloat(end) },
      { content },
      { new: true, upsert: true }
    );
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// ── Delete a note ─────────────────────────────────────────────────────────────
router.delete("/notes/:noteId", async (req, res) => {
  try {
    const { noteId } = req.params;
    await notesModel.findByIdAndDelete(noteId);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Get all annotations for a video ──────────────────────────────────────────
router.get("/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const annotations = await annotationModel.findOne({ videoId });
    res.status(200).json({ annotations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Get annotations for a time range ─────────────────────────────────────────
router.get("/time/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const startTime = parseFloat(req.query.startTime);
    const endTime   = parseFloat(req.query.endTime);
    const doc = await annotationModel.findOne({ videoId });
    if (!doc) return res.status(200).json({ annotations: [] });
    const filtered = doc.annotations.filter(
      a => a.startTime <= endTime && a.endTime >= startTime
    );
    res.status(200).json({ annotations: filtered });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Delete a single annotation ────────────────────────────────────────────────
router.delete("/:videoId/:annotationId", async (req, res) => {
  try {
    const { videoId, annotationId } = req.params;
    const doc = await annotationModel.findOneAndUpdate(
      { videoId },
      { $pull: { annotations: { _id: annotationId } } },
      { new: true }
    );
    res.status(200).json({ annotations: doc?.annotations || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ── Delete all annotations for a video ───────────────────────────────────────
router.delete("/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    await annotationModel.findOneAndUpdate(
      { videoId },
      { $set: { annotations: [] } }
    );
    res.status(200).json({ message: "All annotations cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;