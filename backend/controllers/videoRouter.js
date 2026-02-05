import express from "express";
import { videoModel } from "../db.js";
const router = express.Router();
router.post("/addVideo",async (req,res) =>{
    const {source,platform} = req.body;
    if(!source || !platform){
        return res.status(400).json({
            message:"source and platform are required"
        })
    }
    const result = await videoModel.create({source,platform});
    res.status(201).json({
        message:"video added successfully",
        video:result
    })

});
export default router;
