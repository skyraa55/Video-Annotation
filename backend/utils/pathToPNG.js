import  { createCanvas } from "canvas";
import  fs from "fs";
import  { v4 as  uuid } from "uuid";

async function pathToPNG(annotation, videoWidth, videoHeight) {
  const canvas = createCanvas(videoWidth, videoHeight);
  const ctx = canvas.getContext("2d");

  ctx.strokeStyle = annotation.data.strokeColor || "red";
  ctx.lineWidth = annotation.data.strokeWidth || 3;

  const path = annotation.data.paths;

  ctx.beginPath();

  path.forEach(p => {
    if (p[0] === "M") ctx.moveTo(p[1], p[2]);
    if (p[0] === "L") ctx.lineTo(p[1], p[2]);
  });

  ctx.stroke();

  const fileName = `temp/${uuid()}.png`;
  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(fileName, buffer);

  return fileName;
}

export default pathToPNG;