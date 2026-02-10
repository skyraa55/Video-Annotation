import express from "express";
import { annotationModel } from "../db.js";
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
        const annotations = await annotationModel.create(req.body);
        res.status(200).json({ annotations });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message })
    }
});
router.get("/:videoId", async (req, res) => {
    try {
        const { videoId } = req.params;
        const annotations = await annotationModel.find({ videoId });
        res.status(200).json({ annotations });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }


});
export default router;