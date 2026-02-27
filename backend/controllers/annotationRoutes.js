import express from "express";
import { annotationModel } from "../db.js";
import { notesModel } from "../db.js";
const router = express.Router();

// router.post("/createAnnotation",async (req,res)=>{
//     try{
//         const result = await annotationModel.create(req.body);
//         res.status(201).json(result);
//     }
//     catch(e){
//         res.status(500).json({ message:e.message });
//     }
// });
// router.get("/:videoId",async (req,res) =>{
//     try{
//         const result = await annotationModel.findOne({
//             videoId:req.params.videoId
//         });
//         res.status(201).json(result);
//     }
//     catch(err){
//         res.status(500).json({message:e.message});
//     }
// });
router.post("/create", async (req, res) => {
    try {
        const { videoId,annotations }=req.body;
        let annotationDoc = await annotationModel.findOneAndUpdate(
            { videoId },
            { $push : { annotations: { $each: annotations} }},
            { new :true,upsert:true}
        );
        res.status(201).json(annotationDoc);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
});
router.get("/:videoId", async (req, res) => {
    try {
        const { videoId } = req.params;
        const annotations = await annotationModel.findOne({ videoId });
        res.status(200).json({ annotations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }


});
router.get("/time/:videoId",async (req,res)=>{
    try{
        const videoId = req.params.videoId;
        const startTime = parseFloat(req.query.startTime);
        const endTime = parseFloat(req.query.endTime);

        const annotations = await annotationModel.findOne({ videoId });
        if(!annotations) console.log("No annotaions found for this video");
        if(!annotations) return res.status(200).json({ annotations : []});
        if(!annotations) console.log("No annotaions found for this video");
        const filteredAnnotaions = annotations.annotations.filter(annotaion => annotaion.startTime <= endTime && annotaion.endTime >= startTime);
        res.status(200).json({ annotations : filteredAnnotaions });
    }
    catch(err){
        res.status(500).json({ error:err.message });
        console.log("catch block error");
    }
});
router.get("/getNotes/:videoId",async (req,res) => {
    const { videoId } = req.params;
   const { start,end } = req.query;
    console.log("videoId-",videoId,"start-",start,"end-",end);
    const note = await notesModel.findOne({
        videoId,
        start:start,
        end:end
    });
    res.json(note || null);
});
router.post("/saveNotes", async (req, res) => {
  try {
    const { videoId, start, end, content } = req.body;
    const note = await notesModel.findOneAndUpdate(
      { videoId, start, end },
      { content },
      { new: true, upsert: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
router.get("/getAllNotes/:videoId",async (req,res) => {
    const { videoId } = req.params;
    const notes = await notesModel.find({
        videoId
    });
    res.json(notes);
})
export default router;