import escapeText from "./textEscape.js";
import pathToPNG from "./pathToPNG.js";
async function buildFilters(annotations, videoWidth, videoHeight) {
  let filters = [];
  let inputs = [];
  let inputIndex = 1;
  for (const a of annotations) {
    const x = Math.round(a.position.x * videoWidth);
    const y = Math.round(a.position.y * videoHeight);
    const w = Math.round(a.size.width * videoWidth);
    const h = Math.round(a.size.height * videoHeight);
    if (a.data.shapeType === "rectangle") {
      filters.push(
        `drawbox=x=${x}:y=${y}:w=${w}:h=${h}:color=${a.data.strokeColor}@0.5:t=3:enable='between(t,${a.startTime},${a.endTime})'`
      );
    }
    if (a.data.shapeType === "text") {
      const text = escapeText(a.data.text);
      filters.push(
        `drawtext=text='${text}':x=${x}:y=${y}:fontsize=${a.data.fontSize}:fontcolor=${a.data.fillColor}:enable='between(t,${a.startTime},${a.endTime})'`
      );
    }
    if (a.data.shapeType === "draw") {
      const pngPath = await pathToPNG(a, videoWidth, videoHeight);
      inputs.push(`-i ${pngPath}`);
      filters.push(
        `[0:v][${inputIndex}:v] overlay=0:0:enable='between(t,${a.startTime},${a.endTime})'`
      );
      inputIndex++;
    }
  }
  return { filters, inputs };
}
export default buildFilters;