import express from "express";
import { ffmpeg } from "fluent-ffmpeg";
import { ffmpegpath } from "ffmpeg-static";
import axios from "axios";
import { fs } from "fs-extra";
import { buildFilters } from "../utils/filterBuilder";
import { annotationModel } from "../db";
import { videoModel } from "../db";
const router = express.Router();



router.post("/:videoId",async (req,res) => {
    const { videoId } = req.params;
    const videoDoc = await videoModel.findOne({ videoId });
    const annotationDoc = await annotationModel.findOne({ videoId });
    if(!videoDoc){
        res.status(404).json({ message : "video not found"});
    }
    const inputPath = `temp/input-${videoId}.mp4`;
    const outputPath = `temp/output-${videoId}.mp4`;
    const response = await axios({
        method: "GET",
        url: videoDoc.url,
        responseType: "stream"
    });



});