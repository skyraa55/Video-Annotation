import { createCanvas } from "canvas";
import { v4 as uuid } from "uuid";
import { fs } from "fs";
async function pathToPNG(annotation,videoWidth,videoHeight) {
    const canvas = createCanvas(videoWidth,videoHeight);
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = annotation.data.strokeColor || "red";
    ctx.lineWidth = annotation.data.strokeWidth || 3;
    const path = annotation.data.path;
    ctx.beginPath();
    path.forEach(p => {
        if(p[0] == "M") ctx.moveTo(p[1],p[2]);
        if(p[1] == "L") ctx.lineTo(p[1],p[2]);
        
    });
    ctx.stroke();
    const filename = `temp/${uuid()}.png`;
    const buffer = canvas.toBuffer("image/png");
    f.writeFileSync(temp,buffer);
    return filename;
    
}
export default pathToPNG;

