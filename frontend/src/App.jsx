
import React from 'react';
import { useState, useEffect } from 'react'
import { useRef } from 'react';
import axios from 'axios';
import * as fabric from "fabric";
import Rectangle from './icons/Rectangle';
import Rambus from './icons/Rambus';
import Circle from './icons/Circle';

function App() {
  const fileRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [videofile, setVideofile] = useState(null);
  const [url, setUrl] = useState("");
  const [tool, setTool] = useState("select");
  const [thumbnails, setThumbnails] = useState([]);
  const [annotations, setAnnotations] = useState([]);
  const startTimeRef = useRef(null);
  const currentShapeRef = useRef(null);
  const activeRangeRef = useRef(null);
  const [videoId, setVideoId] = useState(null);
  const renderedAnnotationRef = useRef(new Map());
  const isDrawingRef = useRef(false);

  const SerializeAnnotations = (shape, canvas, startTime, endTime, tool) => {
    if (!videoId) {
      console.log("video is not uploaded yet");
      return;
    }
    const obj = shape.toObject();
    const vw = canvas.getWidth();
    const vh = canvas.getHeight();
    const annotations = {
      type: tool,
      startTime,
      endTime,
      position: {
        x: obj.left / vw,
        y: obj.top / vh
      },
      size: {
        width: (obj.width * (obj.scaleX || 1)) / vw,
        height: (obj.height * (obj.scaleY || 1)) / vh
      },
      rotation: obj.angle || 0,
      draggable: true,
      visible: true,
      data: {}
    }
    if (tool == "draw") {
      annotations.data = {
        shapeType: "draw",
        strokeColor: obj.stroke,
        strokeWidth: obj.strokeWidth,
        fillColor: obj.fill || "transparent",
        paths: obj.path
      };
    }
    else {
      annotations.data = {
        shapeType: tool,
        strokeColor: obj.stroke,
        strokeWidth: obj.strokeWidth,
        fillColor: obj.fill,
        text: obj.text || null,
        fontSize: obj.fontSize || null,
        imageUrl: obj.imageUrl || null,
      }
    }
    return annotations;
  }

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, { selection: false, backgroundColor: "transparent" });
    if (!canvas) return;
    canvas.selection = false;
    canvas.isDrawingMode = tool === "draw";
    canvas.setDimensions({ width: 900, height: 600 });
    fabricRef.current = canvas;
    return () => {
      canvas.dispose();
    }
  }, []);

  useEffect(() => {
    if (!url || !videoId) return;
    axios.get(`http://localhost:3000/api/annotations/${videoId}`).then(res => {
      const doc = res.data.annotations;
      if (!doc || !doc.annotations || doc.annotations.length === 0) {
        setAnnotations([]);
        return;
      }
      setAnnotations(doc.annotations);
    });
  }, [url, videoId]);

  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    let drawing = false;
    let shape = null;
    let startX = 0;
    let startY = 0;
    const moveDown = (opt) => {
      if (!canvas || tool == "select") return;
      if (!activeRangeRef.current) {
        alert("Select a time range first");
        return;
      }
      const { start, end } = activeRangeRef.current;
      const t = videoRef.current.currentTime;
      if (t < start || t > end) {
        alert("Please draw within the selected time range");
        return;
      }
      videoRef.current.pause();
      isDrawingRef.current = true;
      if (tool !== "text") {
        drawing = true;
        canvas.discardActiveObject();
      }
      const p = canvas.getViewportPoint(opt.e);
      startX = p.x;
      startY = p.y;
      startTimeRef.current = videoRef.current.currentTime;
      if (tool == "rectangle") {
        shape = new fabric.Rect({
          width: 1,
          height: 1,
          left: startX,
          top: startY,
          fill: "transparent",
          stroke: "red",
          strokeWidth: 2,
          selectable: false,
          evented: false
        });
      }
      if (tool == 'circle') {
        shape = new fabric.Ellipse({
          rx: 1,
          ry: 1,
          left: startX,
          top: startY,
          originX: "center",
          originY: "center",
          fill: "transparent",
          stroke: "red",
          strokeWidth: 2,
          selectable: false,
          evented: false
        });
      }
      if (tool == "rambus") {
        shape = new fabric.Polygon([
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 0, y: 0 },
        ], {
          left: startX,
          top: startY,
          fill: "transparent",
          stroke: "red",
          strokeWidth: 2,
          selectable: false,
          evented: false
        })
      }
      if (tool === "text") {
        if (!activeRangeRef.current) {
          alert("Select a time range first");
          return;
        }

        const { start, end } = activeRangeRef.current;
        const t = videoRef.current.currentTime;

        if (t < start || t > end) {
          alert("Please add text within selected time range");
          return;
        }

        videoRef.current.pause();

        const text = new fabric.IText("", {
          left: startX,
          top: startY,
          fill: "red",
          fontSize: 22,
          selectable: true,
          editable: true,
        });

        canvas.add(text);
        canvas.setActiveObject(text);
        text.enterEditing();
        text.hiddenTextarea?.focus();

        isDrawingRef.current = true;

        text.on("editing:exited", async () => {
          if (!text.text.trim()) {
            canvas.remove(text);
            isDrawingRef.current = false;
            return;
          }

          const annotationData = SerializeAnnotations(
            text,
            fabricRef.current,
            start,
            end,
            "text"
          );

          try {
            const res = await axios.post(
              "http://localhost:3000/api/annotations/create",
              { videoId, annotations: [annotationData] }
            );

            canvas.remove(text); // 🔥 IMPORTANT
            setAnnotations(res.data.annotations);

          } catch (error) {
            console.error("Error saving text:", error);
            canvas.remove(text);
          }

          isDrawingRef.current = false;
        });

        return;
      }
      if (tool === "draw") {
        canvas.isDrawingMode = true;
        const brush = new fabric.PencilBrush(canvas);
        brush.color = "red";
        brush.width = 3;
        canvas.freeDrawingBrush = brush;
      } else {
        canvas.isDrawingMode = false;
      }
      if (shape) {
        canvas.add(shape);
        currentShapeRef.current = shape;
      }
    }

    const onMouseMove = (opt) => {
      if (!drawing || !shape) return;
      const p = canvas.getViewportPoint(opt.e);
      const w = p.x - startX;
      const h = p.y - startY;
      if (tool == "rectangle") {
        shape.set({
          width: Math.abs(w),
          height: Math.abs(h),
          left: Math.min(p.x, startX),
          top: Math.min(p.y, startY),
        });
      }
      if (tool == "circle") {
        shape.set({
          rx: Math.max(1, Math.abs(w) / 2),
          ry: Math.max(1, Math.abs(h) / 2),
          left: startX + w / 2,
          top: startY + h / 2
        });
      }
      if (tool === "rambus") {
        const absW = Math.abs(w);
        const absH = Math.abs(h);
        shape.set({
          left: Math.min(startX, p.x),
          top: Math.min(startY, p.y),
          points: [
            { x: absW / 2, y: 0 },
            { x: absW, y: absH / 2 },
            { x: absW / 2, y: absH },
            { x: 0, y: absH / 2 },
          ],
        });
      }
      if (tool === "draw") {
        const points = shape.path;
        const lastPoint = points[points.length - 1];
        if (lastPoint[1] != 'M') {
          shape.path.push(['L', p.x, p.y]);
        }
        else {
          shape.path.push(['M', p.x, p.y]);
        }
        shape.set({
          width: Math.abs(w),
          height: Math.abs(h),
          left: Math.min(p.x, startX),
          top: Math.min(p.y, startY)
        })
      }
      canvas.requestRenderAll();
    }

    const mouseUp = async () => {
      if (tool === "text") return;
      drawing = false;
      const shape = currentShapeRef.current;
      if (!shape) return;
      shape.setCoords();
      if (!activeRangeRef.current) {
        canvas.remove(shape);
        currentShapeRef.current = null;
        isDrawingRef.current = false;
        return;
      }
      const { start, end } = activeRangeRef.current;
      const annotationData = SerializeAnnotations(
        shape,
        fabricRef.current,
        start,
        end,
        tool
      );
      if (!annotationData) return;
      console.log("Saving annotation:", start, end);
      try {
        const res = await axios.post(
          "http://localhost:3000/api/annotations/create",
          { videoId, annotations: [annotationData] }
        );
        setAnnotations(res.data.annotations);
        console.log("Fetched annotations:", res.data.annotations);
        canvas.remove(shape);
      } catch (error) {
        console.error("Error saving annotation:", error);
        canvas.remove(shape);
      }
      currentShapeRef.current = null;
      isDrawingRef.current = false;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    };
    canvas.on("mouse:down", moveDown);
    canvas.on("mouse:move", onMouseMove);
    canvas.on("mouse:up", mouseUp);
    return () => {
      canvas.off("mouse:down", moveDown);
      canvas.off("mouse:move", onMouseMove);
      canvas.off("mouse:up", mouseUp);
    }
  }, [tool, videoId]);
  const renderAnnotation = (a, canvas) => {
    const vw = canvas.getWidth();
    const vh = canvas.getHeight();
    let shape;
    if (a.data.shapeType === "rectangle") {
      shape = new fabric.Rect({
        left: a.position.x * vw,
        top: a.position.y * vh,
        width: a.size.width * vw,
        height: a.size.height * vh,
        fill: a.data.fillColor,
        stroke: a.data.strokeColor,
        strokeWidth: a.data.strokeWidth,
        selectable: false
      });
    }
    if (a.data.shapeType === "circle") {
      shape = new fabric.Ellipse({
        left: a.position.x * vw,
        top: a.position.y * vh,
        rx: (a.size.width * vw) / 2,
        ry: (a.size.height * vh) / 2,
        fill: a.data.fillColor,
        stroke: a.data.strokeColor,
        strokeWidth: a.data.strokeWidth,
        selectable: false
      });
    }

    if (a.data.shapeType === "rambus") {
      const w = a.size.width * vw;
      const h = a.size.height * vh;
      shape = new fabric.Polygon([
        { x: w / 2, y: 0 },
        { x: w, y: h / 2 },
        { x: w / 2, y: h },
        { x: 0, y: h / 2 }
      ], {
        left: a.position.x * vw,
        top: a.position.y * vh,
        fill: a.data.fillColor,
        stroke: a.data.strokeColor,
        strokeWidth: a.data.strokeWidth,
        selectable: false
      });
    }

    if (a.data.shapeType === "draw") {
      shape = new fabric.Path(a.data.paths, {
        fill: a.data.fillColor,
        stroke: a.data.strokeColor,
        strokeWidth: a.data.strokeWidth,
        selectable: false,
        width: a.size.width * vw,
        height: a.size.height * vh,
        left: a.position.x * vw,
        top: a.position.y * vh,
      })
    }
    if (a.data.shapeType === "text") {
      shape = new fabric.IText(a.data.text, {
        left: a.position.x * vw,
        top: a.position.y * vh,
        fill: a.data.fillColor,
        fontSize: a.data.fontSize,
        selectable: tool === "select",
        evented: true,
        editable: false
      });
    }
    if (shape) {
      shape.annotationId = a._id;
      canvas.add(shape);
    }
    return shape;
  }

  useEffect(() => {
    const video = videoRef.current;
    const canvas = fabricRef.current;
    if (!video || !canvas) return;
    const onTimeUpdate = () => {
      if (isDrawingRef.current) return;
      const currentTime = video.currentTime;
      let currentRange = null;
      for (const thumbnail of thumbnails) {
        if (currentTime >= thumbnail.start && currentTime <= thumbnail.end) {
          currentRange = { start: thumbnail.start, end: thumbnail.end };
          break;
        }
      }
      const objectsToRemove = [];
      canvas.getObjects().forEach(obj => {
        if (!obj.annotationId) return;
        const annotation = annotations.find(a => a._id === obj.annotationId);
        const shouldRemove = !annotation ||
          currentTime < annotation.startTime ||
          currentTime > annotation.endTime ||
          (currentRange && (
            Math.abs(annotation.startTime - currentRange.start) > 0.1 ||
            Math.abs(annotation.endTime - currentRange.end) > 0.1
          ));

        if (shouldRemove) {
          objectsToRemove.push(obj);
          renderedAnnotationRef.current.delete(obj.annotationId);
        }
      });
      objectsToRemove.forEach(obj => canvas.remove(obj));
      annotations.forEach(annotation => {

        // const belongsToCurrentRange = currentRange &&
        //  annotation.startTime >= currentRange.start &&
        //   annotation.endTime <= currentRange.end ;
        // const isInTimeRange = currentTime >= annotation.startTime && currentTime <= annotation.endTime;
        // if (belongsToCurrentRange && isInTimeRange && !renderedAnnotationRef.current.has(annotation._id)) {
        const isInTimeRange =
          currentTime >= annotation.startTime &&
          currentTime <= annotation.endTime;
        if (isInTimeRange &&
          !renderedAnnotationRef.current.has(annotation._id)) {
          const shape = renderAnnotation(annotation, canvas);
          if (shape) {
            renderedAnnotationRef.current.set(annotation._id, shape);
          }
        }
      });
      canvas.requestRenderAll();
    };
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [annotations, thumbnails]);
  const handleFilechange = (e) => {
    const selectedFiles = e.target.files[0];
    if (!selectedFiles) return;
    if (!selectedFiles.type.endsWith("mp4")) {
      console.log("select only video files");
      return;
    }
    setVideofile(selectedFiles);
  }
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", videofile);
    const res = await axios.post("http://localhost:3000/api/cloudinary/upload", formData);
    if (res) {
      console.log("video is uploaded to cloudinary successfully");
      console.log(res.data.video.url);
      setUrl(res.data.video.url);
      setThumbnails(res.data.thumbnails);
      setVideoId(res.data.video._id);
    }
    else {
      console.log("there is an error while uploading");
    }
  }
  useEffect(() => {
    if (!fabricRef.current || !videoRef.current) return;
    const canvas = fabricRef.current;
    const video = videoRef.current;
    const resizeCanvas = () => {
      const rect = video.getBoundingClientRect();
      canvas.setDimensions({
        width: rect.width,
        height: rect.height,
      });
      canvas.calcOffset();
      canvas.requestRenderAll();
    };
    video.addEventListener("loadedmetadata", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    return () => {
      video.removeEventListener("loadedmetadata", resizeCanvas);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);
  return (
    <div className='flex gap-4 top-4'>
      <div className="gap-2">
        <input type="file" ref={fileRef} accept="video/*" style={{ display: "none" }} onChange={handleFilechange} />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md h-12 mt-2 mr-2" onClick={() => fileRef.current.click()}>Add video</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md h-12 mt-2" onClick={handleUpload}>upload</button>
      </div>
      <div className='w-full max-w-[900px] h-[600px] mt-12 '>
        <div className="p-6">
          <div className="mb-4 flex gap-2">
            <button onClick={() => setTool("select")}>Select</button>
            <button onClick={() => setTool("rectangle")}>Rectangle</button>
            <button onClick={() => setTool("circle")}>Circle</button>
            <button onClick={() => setTool("rambus")}>Rhombus</button>
            <button onClick={() => setTool("draw")}>Draw</button>
            <button onClick={() => setTool("text")}>Text</button>
          </div>
          <div
            className="relative"
            style={{ width: 900, height: 600 }}
          >
            <video
              ref={videoRef}
              src={url}
              controls
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 z-10"
            />
          </div>
          <div className='flex mt-4 gap-2 overflow-x-auto'>
            {
              thumbnails.map(t => (
                <div key={t.start} onClick={() => {
                  activeRangeRef.current = {
                    start: t.start,
                    end: t.end
                  };
                  console.log("Active range set:", activeRangeRef.current);
                  const canvas = fabricRef.current;
                  renderedAnnotationRef.current.forEach(obj => canvas.remove(obj));
                  renderedAnnotationRef.current.clear();
                  canvas.requestRenderAll();
                  videoRef.current.currentTime = t.start;
                  videoRef.current.play().catch(() => { });
                }}
                  className='w-18 h-18 cursor-pointer'>
                  <img src={t.url} alt={`${t.start}s - ${t.end}s`} />
                  <p>{t.start}s - {t.end}s</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default App