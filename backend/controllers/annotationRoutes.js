import express from "express";
import { annotationModel } from "../db.js";
const router = express.Router();

router.post("/createAnnotation",async (req,res)=>{
    try{
        const result = await annotationModel.create(req.body);
        res.status(201).json(result);
    }
    catch(e){
        res.status(500).json({ message:e.message });
    }
});
router.get("/:videoId",async (req,res) =>{
    try{
        const result = await annotationModel.findOne({
            videoId:req.params.videoId
        });
        res.status(201).json(result);
    }
    catch(err){
        res.status(500).json({message:e.message});
    }
});

export default router;