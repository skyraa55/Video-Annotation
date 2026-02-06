import cloudinary from "./cloudinary.js";
import { videoModel } from "../db.js";
import upload from "../middleware/upload.js";
import express from "express";
const router = express.Router();
router.post("/upload",upload.single("video"),async (req,res)=>{
    try{
        if(!req.file){
        return res.status(400).json({message:"file is required"});
    }
    const result = await cloudinary.uploader.upload(req.file.path,{
        resource_type:"video",
        folder:"video"
    });
    const video = await videoModel.create({
        url:result.secure_url,
        publicId:result.public_id,
        format:result.farmat,
        duration:result.duration,
        size:result.bytes,
        // uploadedBy:req.user._id
    });
    res.status(201).json(video);

    }
    catch(err){
        console.log(err.message);
    }
    

});
export default router;