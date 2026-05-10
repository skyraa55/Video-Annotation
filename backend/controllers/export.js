



// import express from "express";
// import ffmpeg from "fluent-ffmpeg";
// import ffmpegPath from "ffmpeg-static";
// import axios from "axios";
// import fs from "fs-extra";
// import { annotationModel, videoModel } from "../db.js";
// import { createCanvas } from "canvas";

// ffmpeg.setFfmpegPath(ffmpegPath);

// const router = express.Router();

// /**
//  * Draws all annotations that are active at a given time onto a node-canvas,
//  * returns PNG buffer.
//  */
// function renderFrame(annotations, time, width, height) {
//   const canvas = createCanvas(width, height);
//   const ctx    = canvas.getContext("2d");
//   ctx.clearRect(0, 0, width, height);

//   const active = annotations.filter(a => time >= a.startTime && time <= a.endTime);

//   for (const ann of active) {
//     const { data, position, size, rotation } = ann;
//     const x = position.x * width;
//     const y = position.y * height;
//     const w = size.width  * width;
//     const h = size.height * height;

//     ctx.save();
//     ctx.translate(x + w / 2, y + h / 2);
//     ctx.rotate(((rotation || 0) * Math.PI) / 180);
//     ctx.translate(-(x + w / 2), -(y + h / 2));

//     ctx.strokeStyle = data.strokeColor || "#ff0000";
//     ctx.lineWidth   = data.strokeWidth || 2;
//     ctx.fillStyle   = data.fillColor   || "transparent";

//     if (data.shapeType === "rectangle") {
//       if (data.fillColor && data.fillColor !== "transparent") ctx.fillRect(x, y, w, h);
//       ctx.strokeRect(x, y, w, h);

//     } else if (data.shapeType === "circle") {
//       ctx.beginPath();
//       ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
//       if (data.fillColor && data.fillColor !== "transparent") ctx.fill();
//       ctx.stroke();

//     } else if (data.shapeType === "rambus") {
//       ctx.beginPath();
//       ctx.moveTo(x + w / 2, y);
//       ctx.lineTo(x + w, y + h / 2);
//       ctx.lineTo(x + w / 2, y + h);
//       ctx.lineTo(x, y + h / 2);
//       ctx.closePath();
//       if (data.fillColor && data.fillColor !== "transparent") ctx.fill();
//       ctx.stroke();

//     } else if (data.shapeType === "text" && data.text) {
//       ctx.font      = `${data.fontSize || 20}px sans-serif`;
//       ctx.fillStyle = data.strokeColor || "#ffffff";
//       ctx.fillText(data.text, x, y + (data.fontSize || 20));

//     } else if (data.shapeType === "draw" && data.paths) {
//       ctx.beginPath();
//       const paths = data.paths;
//       for (const seg of paths) {
//         if (seg[0] === "M") ctx.moveTo(seg[1], seg[2]);
//         else if (seg[0] === "L") ctx.lineTo(seg[1], seg[2]);
//         else if (seg[0] === "Q") ctx.quadraticCurveTo(seg[1], seg[2], seg[3], seg[4]);
//         else if (seg[0] === "C") ctx.bezierCurveTo(seg[1], seg[2], seg[3], seg[4], seg[5], seg[6]);
//       }
//       ctx.stroke();
//     }
//     ctx.restore();
//   }

//   return canvas.toBuffer("image/png");
// }

// router.post("/:videoId", async (req, res) => {
//   const { videoId } = req.params;
//   try {
//     const videoDoc     = await videoModel.findById(videoId);
//     const annotationDoc = await annotationModel.findOne({ videoId });

//     if (!videoDoc) return res.status(404).json({ message: "Video not found" });

//     const inputPath  = `temp/input-${videoId}.mp4`;
//     const outputPath = `temp/output-${videoId}.mp4`;
//     const overlayDir = `temp/overlay-${videoId}`;

//     await fs.ensureDir("temp");
//     await fs.ensureDir(overlayDir);

//     // Download video from Cloudinary
//     const response = await axios({ method: "GET", url: videoDoc.url, responseType: "stream" });
//     await new Promise((resolve, reject) => {
//       const stream = fs.createWriteStream(inputPath);
//       response.data.pipe(stream);
//       stream.on("finish", resolve);
//       stream.on("error", reject);
//     });

//     const annotations = annotationDoc?.annotations || [];

//     if (annotations.length === 0) {
//       // No annotations – just stream the original
//       res.setHeader("Content-Disposition", 'attachment; filename="annotated-video.mp4"');
//       res.setHeader("Content-Type", "video/mp4");
//       fs.createReadStream(inputPath).pipe(res).on("finish", () => {
//         fs.remove(inputPath);
//       });
//       return;
//     }

//     const VIDEO_W = 1280;
//     const VIDEO_H = 720;
//     const FPS     = 25;

//     // Collect all unique time breakpoints
//     const timePoints = new Set();
//     annotations.forEach(a => { timePoints.add(a.startTime); timePoints.add(a.endTime); });
//     const sortedTimes = [...timePoints].sort((a, b) => a - b);

//     // Build an ffmpeg overlay using a PNG image sequence approach
//     // Strategy: use ffmpeg's overlay filter with a static image per "segment"
//     // For each annotation segment, generate an overlay PNG and chain overlays

//     const duration = videoDoc.duration || 60;
//     const frames   = Math.ceil(duration * FPS);

//     // Generate per-second overlay images to keep it manageable
//     // Build filter_complex with drawbox / drawtext where possible – simpler alternative:
//     // Use the "movie" + "overlay" filter per annotation

//     // Simple approach: render one overlay PNG per annotation segment
//     const overlayInputs = [];
//     const filterParts   = [];
//     let   prevOut       = "[0:v]";

//     for (let i = 0; i < annotations.length; i++) {
//       const ann = annotations[i];
//       const framePng = `${overlayDir}/ann_${i}.png`;

//       // Render a transparent canvas with only this annotation
//       const buf = renderFrame([ann], ann.startTime, VIDEO_W, VIDEO_H);
//       await fs.writeFile(framePng, buf);
//       overlayInputs.push(framePng);

//       const inputIdx  = i + 1; // 0 = video
//       const outLabel  = i < annotations.length - 1 ? `[v${i}]` : "[outv]";
//       const inLabel   = prevOut;
//       const enable    = `between(t,${ann.startTime},${ann.endTime})`;

//       filterParts.push(`${inLabel}[${inputIdx}:v]overlay=0:0:enable='${enable}'${outLabel}`);
//       prevOut = outLabel;
//     }

//     const filterComplex = filterParts.join("; ");

//     let cmd = ffmpeg(inputPath);
//     overlayInputs.forEach(p => { cmd = cmd.input(p); });

//     cmd
//       .complexFilter(filterComplex)
//       .outputOptions(["-map [outv]", "-map 0:a?", "-c:v libx264", "-c:a aac", "-preset fast", "-crf 23"])
//       .save(outputPath)
//       .on("end", () => {
//         res.setHeader("Content-Disposition", 'attachment; filename="annotated-video.mp4"');
//         res.setHeader("Content-Type", "video/mp4");
//         const stream = fs.createReadStream(outputPath);
//         stream.pipe(res);
//         stream.on("finish", () => {
//           fs.remove(inputPath).catch(() => {});
//           fs.remove(outputPath).catch(() => {});
//           fs.remove(overlayDir).catch(() => {});
//         });
//       })
//       .on("error", (err) => {
//         console.error("FFmpeg error:", err);
//         fs.remove(inputPath).catch(() => {});
//         fs.remove(outputPath).catch(() => {});
//         fs.remove(overlayDir).catch(() => {});
//         if (!res.headersSent) res.status(500).json({ error: "Export failed: " + err.message });
//       });

//   } catch (error) {
//     console.error("Export route error:", error);
//     if (!res.headersSent) res.status(500).json({ error: "Server error: " + error.message });
//   }
// });

// export default router;




/**
 * export.js
 *
 * POST /api/export/:videoId
 *
 * Strategy
 * ────────
 * 1. Download the original video from Cloudinary to a temp file.
 * 2. If there are no annotations → stream the original back.
 * 3. Otherwise, for each unique annotation we:
 *      a. Render a transparent PNG overlay image with node-canvas.
 *      b. Feed it into ffmpeg as an extra input.
 *      c. Chain overlay filters with `enable='between(t,START,END)'`.
 * 4. ffmpeg produces the final MP4 which is streamed back to the client.
 *
 * Dependencies (add to package.json if missing):
 *   npm install canvas fluent-ffmpeg ffmpeg-static axios fs-extra
 */

// import express       from "express";
// import ffmpeg        from "fluent-ffmpeg";
// import ffmpegPath    from "ffmpeg-static";
// import axios         from "axios";
// import fs            from "fs-extra";
// import path          from "path";
// import { createCanvas } from "canvas";
// import { annotationModel, videoModel } from "../db.js";

// ffmpeg.setFfmpegPath(ffmpegPath);

// const router = express.Router();

// /* ── draw one annotation onto a node-canvas context ─────────────────────── */
// function drawAnnotation(ctx, ann, vw, vh) {
//   const { data: d, position: pos, size: sz, rotation } = ann;
//   const x  = pos.x * vw;
//   const y  = pos.y * vh;
//   const w  = sz.width  * vw;
//   const h  = sz.height * vh;

//   ctx.save();
//   // rotate around shape centre
//   ctx.translate(x + w / 2, y + h / 2);
//   ctx.rotate(((rotation || 0) * Math.PI) / 180);
//   ctx.translate(-(x + w / 2), -(y + h / 2));

//   ctx.strokeStyle = d.strokeColor || "#ff0000";
//   ctx.lineWidth   = d.strokeWidth || 2;
//   ctx.fillStyle   = (d.fillColor && d.fillColor !== "transparent") ? d.fillColor : "rgba(0,0,0,0)";

//   switch (d.shapeType) {
//     case "rectangle":
//       if (d.fillColor && d.fillColor !== "transparent") ctx.fillRect(x, y, w, h);
//       ctx.strokeRect(x, y, w, h);
//       break;

//     case "circle":
//       ctx.beginPath();
//       ctx.ellipse(x + w / 2, y + h / 2, Math.max(1, w / 2), Math.max(1, h / 2), 0, 0, Math.PI * 2);
//       if (d.fillColor && d.fillColor !== "transparent") ctx.fill();
//       ctx.stroke();
//       break;

//     case "rambus":
//       ctx.beginPath();
//       ctx.moveTo(x + w / 2, y);
//       ctx.lineTo(x + w,     y + h / 2);
//       ctx.lineTo(x + w / 2, y + h);
//       ctx.lineTo(x,         y + h / 2);
//       ctx.closePath();
//       if (d.fillColor && d.fillColor !== "transparent") ctx.fill();
//       ctx.stroke();
//       break;

//     case "text":
//       if (d.text) {
//         ctx.font      = `${d.fontSize || 20}px sans-serif`;
//         ctx.fillStyle = d.strokeColor || "#ffffff";
//         ctx.fillText(d.text, x, y + (d.fontSize || 20));
//       }
//       break;

//     case "draw":
//       if (d.paths && Array.isArray(d.paths)) {
//         ctx.beginPath();
//         for (const seg of d.paths) {
//           switch (seg[0]) {
//             case "M": ctx.moveTo(seg[1], seg[2]); break;
//             case "L": ctx.lineTo(seg[1], seg[2]); break;
//             case "Q": ctx.quadraticCurveTo(seg[1], seg[2], seg[3], seg[4]); break;
//             case "C": ctx.bezierCurveTo(seg[1], seg[2], seg[3], seg[4], seg[5], seg[6]); break;
//             case "Z": ctx.closePath(); break;
//           }
//         }
//         ctx.stroke();
//       }
//       break;
//   }
//   ctx.restore();
// }

// /* ── route ───────────────────────────────────────────────────────────────── */
// router.post("/:videoId", async (req, res) => {
//   const { videoId } = req.params;
//   const tmpId       = `${videoId}-${Date.now()}`;
//   const inputPath   = `temp/input-${tmpId}.mp4`;
//   const outputPath  = `temp/output-${tmpId}.mp4`;
//   const overlayDir  = `temp/overlays-${tmpId}`;

//   try {
//     /* 1. fetch video metadata */
//     const videoDoc      = await videoModel.findById(videoId);
//     const annotationDoc = await annotationModel.findOne({ videoId });
//     if (!videoDoc) return res.status(404).json({ message: "Video not found" });

//     const annotations = annotationDoc?.annotations || [];

//     await fs.ensureDir("temp");
//     await fs.ensureDir(overlayDir);

//     /* 2. download original video */
//     const dlRes = await axios({ method: "GET", url: videoDoc.url, responseType: "stream" });
//     await new Promise((resolve, reject) => {
//       const ws = fs.createWriteStream(inputPath);
//       dlRes.data.pipe(ws);
//       ws.on("finish", resolve);
//       ws.on("error",  reject);
//     });

//     /* 3. if nothing to overlay, just return the original */
//     if (annotations.length === 0) {
//       res.setHeader("Content-Disposition", 'attachment; filename="annotated-video.mp4"');
//       res.setHeader("Content-Type", "video/mp4");
//       const rs = fs.createReadStream(inputPath);
//       rs.pipe(res);
//       rs.on("close", () => fs.remove(inputPath).catch(() => {}));
//       return;
//     }

//     /* 4. render each annotation as its own transparent PNG */
//     const VIDEO_W = 1280;
//     const VIDEO_H = 720;

//     const pngPaths = [];
//     for (let i = 0; i < annotations.length; i++) {
//       const ann    = annotations[i];
//       const canvas = createCanvas(VIDEO_W, VIDEO_H);
//       const ctx    = canvas.getContext("2d");
//       ctx.clearRect(0, 0, VIDEO_W, VIDEO_H);
//       drawAnnotation(ctx, ann, VIDEO_W, VIDEO_H);
//       const pngPath = path.join(overlayDir, `ann_${i}.png`);
//       await fs.writeFile(pngPath, canvas.toBuffer("image/png"));
//       pngPaths.push(pngPath);
//     }

//     /* 5. build ffmpeg filter_complex
//        Input 0  = video
//        Input 1  = overlay PNG for annotation[0]
//        Input 2  = overlay PNG for annotation[1]
//        …
//        Chain:   [0:v][1:v]overlay=0:0:enable='between(t,S,E)'[v0];
//                 [v0][2:v]overlay=0:0:enable='between(t,S,E)'[v1];
//                 …[vN-2][N:v]overlay=0:0:enable='between(t,S,E)'[outv]
//     */
//     let prevLabel = "[0:v]";
//     const filterParts = [];

//     for (let i = 0; i < annotations.length; i++) {
//       const ann     = annotations[i];
//       const inIdx   = i + 1;               // ffmpeg input index (0 = video)
//       const outLabel = i < annotations.length - 1 ? `[v${i}]` : "[outv]";
//       const enable  = `between(t,${ann.startTime},${ann.endTime})`;
//       filterParts.push(
//         `${prevLabel}[${inIdx}:v]overlay=0:0:enable='${enable}'${outLabel}`
//       );
//       prevLabel = outLabel;
//     }

//     const filterComplex = filterParts.join("; ");

//     /* 6. run ffmpeg */
//     let cmd = ffmpeg(inputPath);
//     pngPaths.forEach(p => { cmd = cmd.input(p); });

//     await new Promise((resolve, reject) => {
//       cmd
//         .complexFilter(filterComplex)
//         .outputOptions([
//           "-map [outv]",
//           "-map 0:a?",           // keep audio if present
//           "-c:v libx264",
//           "-c:a copy",
//           "-preset fast",
//           "-crf 23",
//           "-movflags +faststart",
//         ])
//         .save(outputPath)
//         .on("end",   resolve)
//         .on("error", reject);
//     });

//     /* 7. stream result back */
//     res.setHeader("Content-Disposition", 'attachment; filename="annotated-video.mp4"');
//     res.setHeader("Content-Type", "video/mp4");
//     const rs = fs.createReadStream(outputPath);
//     rs.pipe(res);
//     rs.on("close", () => {
//       fs.remove(inputPath).catch(()=>{});
//       fs.remove(outputPath).catch(()=>{});
//       fs.remove(overlayDir).catch(()=>{});
//     });

//   } catch (error) {
//     console.error("Export error:", error);
//     fs.remove(inputPath).catch(()=>{});
//     fs.remove(outputPath).catch(()=>{});
//     fs.remove(overlayDir).catch(()=>{});
//     if (!res.headersSent) res.status(500).json({ error: error.message });
//   }
// });

// export default router;






import express       from "express";
import ffmpeg        from "fluent-ffmpeg";
import ffmpegPath    from "ffmpeg-static";
import axios         from "axios";
import fs            from "fs-extra";
import path          from "path";
import { createCanvas } from "canvas";
import { annotationModel, videoModel } from "../db.js";

ffmpeg.setFfmpegPath(ffmpegPath);

const router = express.Router();

/* ── draw one annotation onto a node-canvas context ─────────────────────── */
function drawAnnotation(ctx, ann, vw, vh) {
  const { data: d, position: pos, size: sz, rotation } = ann;
  const x = pos.x * vw;
  const y = pos.y * vh;
  const w = sz.width  * vw;
  const h = sz.height * vh;

  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate(((rotation || 0) * Math.PI) / 180);
  ctx.translate(-(x + w / 2), -(y + h / 2));

  ctx.strokeStyle = d.strokeColor || "#ff0000";
  ctx.lineWidth   = d.strokeWidth || 2;
  ctx.fillStyle   = (d.fillColor && d.fillColor !== "transparent") ? d.fillColor : "rgba(0,0,0,0)";

  switch (d.shapeType) {
    case "rectangle":
      if (d.fillColor && d.fillColor !== "transparent") ctx.fillRect(x, y, w, h);
      ctx.strokeRect(x, y, w, h);
      break;

    case "circle":
      ctx.beginPath();
      ctx.ellipse(x + w / 2, y + h / 2, Math.max(1, w / 2), Math.max(1, h / 2), 0, 0, Math.PI * 2);
      if (d.fillColor && d.fillColor !== "transparent") ctx.fill();
      ctx.stroke();
      break;

    case "rambus":
      ctx.beginPath();
      ctx.moveTo(x + w / 2, y);
      ctx.lineTo(x + w,     y + h / 2);
      ctx.lineTo(x + w / 2, y + h);
      ctx.lineTo(x,         y + h / 2);
      ctx.closePath();
      if (d.fillColor && d.fillColor !== "transparent") ctx.fill();
      ctx.stroke();
      break;

    case "text":
      if (d.text) {
        ctx.font      = `${d.fontSize || 20}px sans-serif`;
        ctx.fillStyle = d.strokeColor || "#ffffff";
        ctx.fillText(d.text, x, y + (d.fontSize || 20));
      }
      break;

    case "draw":
      // d.paths is stored as array of arrays: [["M",x,y],["L",x,y],["Q",…],…]
      if (d.paths && Array.isArray(d.paths)) {
        ctx.beginPath();
        for (const seg of d.paths) {
          if (!Array.isArray(seg) || seg.length === 0) continue;
          const cmd = seg[0];
          switch (cmd) {
            case "M": ctx.moveTo(seg[1], seg[2]); break;
            case "L": ctx.lineTo(seg[1], seg[2]); break;
            case "Q": ctx.quadraticCurveTo(seg[1], seg[2], seg[3], seg[4]); break;
            case "C": ctx.bezierCurveTo(seg[1], seg[2], seg[3], seg[4], seg[5], seg[6]); break;
            case "Z": ctx.closePath(); break;
            default: break;
          }
        }
        ctx.stroke();
      }
      break;

    default:
      break;
  }
  ctx.restore();
}

/* ── route ───────────────────────────────────────────────────────────────── */
router.post("/:videoId", async (req, res) => {
  const { videoId } = req.params;
  const tmpId       = `${videoId}-${Date.now()}`;
  const inputPath   = `temp/input-${tmpId}.mp4`;
  const outputPath  = `temp/output-${tmpId}.mp4`;
  const overlayDir  = `temp/overlays-${tmpId}`;

  try {
    /* 1. fetch video metadata */
    const videoDoc      = await videoModel.findById(videoId);
    const annotationDoc = await annotationModel.findOne({ videoId });
    if (!videoDoc) return res.status(404).json({ message: "Video not found" });

    const annotations = annotationDoc?.annotations || [];

    await fs.ensureDir("temp");
    await fs.ensureDir(overlayDir);

    /* 2. download original video */
    const dlRes = await axios({ method: "GET", url: videoDoc.url, responseType: "stream" });
    await new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(inputPath);
      dlRes.data.pipe(ws);
      ws.on("finish", resolve);
      ws.on("error",  reject);
    });

    /* 3. if nothing to overlay, return original */
    if (annotations.length === 0) {
      res.setHeader("Content-Disposition", 'attachment; filename="annotated-video.mp4"');
      res.setHeader("Content-Type", "video/mp4");
      const rs = fs.createReadStream(inputPath);
      rs.pipe(res);
      rs.on("close", () => fs.remove(inputPath).catch(() => {}));
      return;
    }

    /* 4. render each annotation as a transparent PNG */
    const VIDEO_W = 1280;
    const VIDEO_H = 720;

    const pngPaths = [];
    for (let i = 0; i < annotations.length; i++) {
      const ann    = annotations[i];
      const canvas = createCanvas(VIDEO_W, VIDEO_H);
      const ctx    = canvas.getContext("2d");
      ctx.clearRect(0, 0, VIDEO_W, VIDEO_H);
      drawAnnotation(ctx, ann, VIDEO_W, VIDEO_H);
      const pngPath = path.join(overlayDir, `ann_${i}.png`);
      await fs.writeFile(pngPath, canvas.toBuffer("image/png"));
      pngPaths.push(pngPath);
    }

    /* 5. build ffmpeg filter_complex */
    let prevLabel = "[0:v]";
    const filterParts = [];

    for (let i = 0; i < annotations.length; i++) {
      const ann      = annotations[i];
      const inIdx    = i + 1;
      const outLabel = i < annotations.length - 1 ? `[v${i}]` : "[outv]";
      const enable   = `between(t,${ann.startTime},${ann.endTime})`;
      filterParts.push(
        `${prevLabel}[${inIdx}:v]overlay=0:0:enable='${enable}'${outLabel}`
      );
      prevLabel = outLabel;
    }

    const filterComplex = filterParts.join("; ");

    /* 6. run ffmpeg */
    let cmd = ffmpeg(inputPath);
    pngPaths.forEach(p => { cmd = cmd.input(p); });

    await new Promise((resolve, reject) => {
      cmd
        .complexFilter(filterComplex)
        .outputOptions([
          "-map [outv]",
          "-map 0:a?",
          "-c:v libx264",
          "-c:a copy",
          "-preset fast",
          "-crf 23",
          "-movflags +faststart",
        ])
        .save(outputPath)
        .on("end",   resolve)
        .on("error", reject);
    });

    /* 7. stream result */
    res.setHeader("Content-Disposition", 'attachment; filename="annotated-video.mp4"');
    res.setHeader("Content-Type", "video/mp4");
    const rs = fs.createReadStream(outputPath);
    rs.pipe(res);
    rs.on("close", () => {
      fs.remove(inputPath).catch(() => {});
      fs.remove(outputPath).catch(() => {});
      fs.remove(overlayDir).catch(() => {});
    });

  } catch (error) {
    console.error("Export error:", error);
    fs.remove(inputPath).catch(() => {});
    fs.remove(outputPath).catch(() => {});
    fs.remove(overlayDir).catch(() => {});
    if (!res.headersSent) res.status(500).json({ error: error.message });
  }
});

export default router;