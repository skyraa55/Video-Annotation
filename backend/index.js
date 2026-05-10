// import express from 'express';
// import cors from 'cors';
// const app = express();
// const PORT = 3000;
// import dotenv from "dotenv";
// dotenv.config();
// import authRouter from './controllers/authRouter.js';
// import videoRouter from './controllers/videoRouter.js';
// import cloudinaryRouter from './controllers/cloudinaryRouter.js';
// import annotationRouter from './controllers/annotationRoutes.js';
// import exportRouter from './controllers/export.js';
// app.use(cors());
// app.use(express.json());
// app.use("/api/auth",authRouter);
// app.use("/api/video",videoRouter);
// app.use("/api/cloudinary",cloudinaryRouter);
// app.use("/api/annotations",annotationRouter);
// app.use("/api/export",exportRouter);
// app.listen(process.env.PORT || 3000,()=>{
//     console.log(`Server is running on port ${PORT}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter       from "./controllers/authRouter.js";
import videoRouter      from "./controllers/videoRouter.js";
import cloudinaryRouter from "./controllers/cloudinaryRouter.js";
import annotationRouter from "./controllers/annotationRoutes.js";
import exportRouter     from "./controllers/export.js";
import highlightsRouter from "./controllers/hightlightsRoutes.js";
import commentsRouter from "./controllers/commentsRoutes.js";
import aiNotesRouter from "./controllers/aiNotes.js";
const app  = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth",        authRouter);
app.use("/api/video",       videoRouter);
app.use("/api/cloudinary",  cloudinaryRouter);
app.use("/api/annotations", annotationRouter);
app.use("/api/export",      exportRouter);
app.use("/api/highlights",  highlightsRouter);
app.use("/api/comments",    commentsRouter);
app.use("/api/ai-notes", aiNotesRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));