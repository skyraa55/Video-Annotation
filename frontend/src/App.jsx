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
    const obj = shape.toObject();
    const vw = canvas.getWidth();
    const vh = canvas.getHeight();
    if (!videoId) {
      console.log("video is not uploaded yet");
      return;
    }
    return {
      videoId,
      annotations: [
        {
          type: "shape",
          startTime,
          endTime,
          position: {
            x: obj.left / vw,
            y: obj.top / vh
          },
          size: {
            width: (obj.width * obj.scaleX) / vw,
            height: (obj.height * obj.scaleY) / vh
          },
          rotation: obj.angle || 0,
          draggable: true,
          visible: true,
          data: {
            shapeType: tool,
            strokeColor: obj.stroke,
            fillColor: obj.fill,
            strokeWidth: obj.strokeWidth
          }
        }
      ]
    };




  }
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, { selection: false, backgroundColor: "transparent" });
    if (!canvas) return;
    canvas.setDimensions({ width: 900, height: 600 });
    fabricRef.current = canvas;
    return () => {
      canvas.dispose();
    }

  }, []);
  useEffect(() => {
    if (!url || !videoId) return;

    // axios.get(`http://localhost:3000/api/annotations/${videoId}`).then(res => setAnnotations(res.data.annotations || []));
    axios.get(`http://localhost:3000/api/annotations/${videoId}`).then(res => {
      const doc = res.data.annotations;
      if (!doc || !Array.isArray(doc.annotations)) {
        setAnnotations([]);
        return;
      }
      setAnnotations(doc.annotations);
    });

  }, [url, videoId]);


  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    if (tool === "pen") {
      canvas.isDrawingMode = true;
      const brush = new fabric.PencilBrush(canvas);
      brush.color = "red";
      brush.width = 3;
      canvas.freeDrawingBrush = brush;
    } else {
      canvas.isDrawingMode = false;
    }
  }, [tool]);
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
      if (t < start || t > end) return;
      videoRef.current.pause();
      isDrawingRef.current = true;
      drawing = true;
      canvas.discardActiveObject();
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

      canvas.requestRenderAll();
    }
    const mouseUp = async () => {
      drawing = false;
      const shape = currentShapeRef.current;
      if (!shape) return;
      shape.setCoords();
      const endTime = videoRef.current.currentTime;
      if (!activeRangeRef.current) {
        canvas.remove(shape);
        currentShapeRef.current = null;
        isDrawingRef.current = false;

        return;
      }
      const { start, end } = activeRangeRef.current;
      const annotations = SerializeAnnotations(
        shape,
        fabricRef.current,
        start,
        end,
        tool
      );
      if (!annotations) return;
      const res = await axios.post("http://localhost:3000/api/annotations/create", annotations);
      const savedAnnotation = res.data.annotations.annotations[0];
      shape.annotationId = savedAnnotation._id;
      renderedAnnotationRef.current.set(savedAnnotation._id, shape);
      setAnnotations(prev => [...prev, savedAnnotation]);

      currentShapeRef.current = null;

      isDrawingRef.current = false;
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }

    canvas.on("mouse:down", moveDown);
    canvas.on("mouse:move", onMouseMove);
    canvas.on("mouse:up", mouseUp);


    return () => {
      canvas.off("mouse:down", moveDown);
      canvas.off("mouse:move", onMouseMove);
      canvas.off("mouse:up", mouseUp);
    }

  }, [tool]);

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
      shape = new fabric.Polygon([
        { x: 0, y: 0 },
        { x: a.size.width * vw, y: 0 },
        { x: a.size.width * vw, y: a.size.height * vh },
        { x: 0, y: a.size.height * vh }
      ], {
        left: a.position.x * vw,
        top: a.position.y * vh,
        fill: a.data.fillColor,
        stroke: a.data.strokeColor,
        strokeWidth: a.data.strokeWidth,
        selectable: false
      });
    }

    if (shape) {
      shape.annotationId = a._id;
      canvas.add(shape);
    }
    return shape;
  }


  // useEffect(() => {
  //   const video = videoRef.current;
  //   const canvas = fabricRef.current;
  //   if (!video || !canvas) return;

  //   const onTimeUpdate = () => {
  //     if(isDrawingRef.current) return;
  //     const t = video.currentTime;
  //     renderedAnnotationRef.current.forEach((obj, id) => {
  //       const a = annotations.find(x => x._id === id);
  //       if (!a || t < a.startTime || t > a.endTime) {
  //         canvas.remove(obj);
  //         renderedAnnotationRef.current.delete(id);
  //       }
  //     });
  //     annotations.forEach(a => {
  //       if (
  //         t >= a.startTime &&
  //         t <= a.endTime &&
  //         !renderedAnnotationRef.current.has(a._id)
  //       ) {
  //         const obj = renderAnnotation(a, canvas);
  //         if (obj) renderedAnnotationRef.current.set(a._id, obj);
  //       }
  //     });

  //     canvas.requestRenderAll();
  //   };

  //   video.addEventListener("timeupdate", onTimeUpdate);
  //   return () => video.removeEventListener("timeupdate", onTimeUpdate);
  // }, [annotations]);



  useEffect(() => {
    const video = videoRef.current;
    const canvas = fabricRef.current;
    if (!video || !canvas) return;

    const onTimeUpdate = () => {
      if (isDrawingRef.current) return;
      const t = video.currentTime;
      canvas.getObjects().forEach(obj => {
        if (!obj.annotationId) return;

        const a = annotations.find(x => x._id === obj.annotationId);
        if (!a || t < a.startTime || t > a.endTime) {
          canvas.remove(obj);
          renderedAnnotationRef.current.delete(obj.annotationId);
        }
      });
      annotations.forEach(a => {
        if (
          t >= a.startTime &&
          t <= a.endTime &&
          !renderedAnnotationRef.current.has(a._id)
        ) {
          const obj = renderAnnotation(a, canvas);
          if (obj) renderedAnnotationRef.current.set(a._id, obj);
        }
      });

      canvas.requestRenderAll();
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [annotations]);






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
            <button onClick={() => setTool("pen")}>Pen</button>
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
                  const canvas = fabricRef.current;
                  renderedAnnotationRef.current.forEach(obj => canvas.remove(obj));
                  renderedAnnotationRef.current.clear();
                  canvas.requestRenderAll();

                  videoRef.current.currentTime = t.start;
                  videoRef.current.play().catch(() => { });
                }}
                  className='w-18 h-18'>
                  <img src={t.url} />
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




