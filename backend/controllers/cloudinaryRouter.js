import cloudinary from "./cloudinary.js";
import { videoModel } from "../db.js";
import upload from "../middleware/upload.js";
import express from "express";
const router = express.Router();
const generateVideoThumbnails = (publicId,duration,interval=2)=>{
    let thumbnails = [];
    for(let i=0;i<duration;i+=interval){
        thumbnails.push({
            start:i,
            end:Math.min(i+interval,duration),
            url:cloudinary.url(publicId,{
                resource_type:"video",
                format:"jpg",
                transformation:[
                    { so : i },
                    { width:180,height:100,crop:"fill" }
                ]
            })
        });
    }
    return thumbnails;
}
router.post("/upload",upload.single("video"),async (req,res)=>{
    try{
        if(!req.file){
        return res.status(400).json({message:"file is required"});
    }
    const result = await cloudinary.uploader.upload(req.file.path,{
        resource_type:"video",
        folder:"video"
    });
    const thumbnails = generateVideoThumbnails(result.public_id,Math.floor(result.duration),2);
    const video = await videoModel.create({
        url:result.secure_url,
        publicId:result.public_id,
        format:result.format,
        duration:result.duration,
        size:result.bytes,
        // uploadedBy:req.user._id
    });
    res.status(201).json({ video,thumbnails });

    }
    catch(err){
        console.log(err.message);
    }
    

});
export default router;