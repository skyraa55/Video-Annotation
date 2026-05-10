
// import React from 'react';
// import { useState, useEffect } from 'react'
// import { useRef } from 'react';
// import axios from 'axios';
// import * as fabric from "fabric";
// import Rectangle from './icons/Rectangle';
// import Rambus from './icons/Rambus';
// import Circle from './icons/Circle';

// function App() {
//   const fileRef = useRef(null);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const fabricRef = useRef(null);
//   const [color, setColor] = useState("red");
//   const [videofile, setVideofile] = useState(null);
//   const [url, setUrl] = useState("");
//   const [tool, setTool] = useState("select");
//   const [thumbnails, setThumbnails] = useState([]);
//   const [annotations, setAnnotations] = useState([]);
//   const startTimeRef = useRef(null);
//   const currentShapeRef = useRef(null);
//   const activeRangeRef = useRef(null);
//   const [videoId, setVideoId] = useState(null);
//   const renderedAnnotationRef = useRef(new Map());
//   const isDrawingRef = useRef(false);
//   const [allNotes, setAllNotes] = useState([]);
//   const [notes, setNotes] = useState([]);
//   const [showNotes, setShowNotes] = useState(false);
//   const [activeNotes, setActiveNotes] = useState({ start: null, end: null, content: "" });
//   const [currentNoteRange, setCurrentNoteRange] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const thumbnailContainerRef = useRef(null);
//   const progressBarRef = useRef(null);
//   const [range, setRange] = useState({ start: 0, end: 5 });
//   const [isDraggingRange, setIsDraggingRange] = useState(false);


//   const SerializeAnnotations = (shape, canvas, startTime, endTime, tool) => {
//     if (!videoId) {
//       console.log("video is not uploaded yet");
//       return;
//     }
//     const obj = shape.toObject();
//     const vw = canvas.getWidth();
//     const vh = canvas.getHeight();
//     const annotations = {
//       type: tool,
//       startTime,
//       endTime,
//       position: {
//         x: obj.left / vw,
//         y: obj.top / vh
//       },
//       size: {
//         width: (obj.width * (obj.scaleX || 1)) / vw,
//         height: (obj.height * (obj.scaleY || 1)) / vh
//       },
//       rotation: obj.angle || 0,
//       draggable: true,
//       visible: true,
//       data: {}
//     }
//     if (tool == "draw") {
//       annotations.data = {
//         shapeType: "draw",
//         strokeColor: obj.stroke,
//         strokeWidth: obj.strokeWidth,
//         fillColor: obj.fill || "transparent",
//         paths: obj.path
//       };
//     }
//     else {
//       annotations.data = {
//         shapeType: tool,
//         strokeColor: obj.stroke,
//         strokeWidth: obj.strokeWidth,
//         fillColor: obj.fill,
//         text: obj.text || null,
//         fontSize: obj.fontSize || null,
//         imageUrl: obj.imageUrl || null,
//       }
//     }
//     return annotations;
//   }

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, { selection: false, backgroundColor: "transparent" });
//     if (!canvas) return;
//     canvas.selection = false;
//     canvas.isDrawingMode = tool === "draw";
//     canvas.setDimensions({ width: 900, height: 600 });
//     fabricRef.current = canvas;
//     return () => {
//       canvas.dispose();
//     }
//   }, []);

//   useEffect(() => {
//     if (!url || !videoId) return;
//     axios.get(`http://localhost:3000/api/annotations/${videoId}`).then(res => {
//       const doc = res.data.annotations;
//       if (!doc || !doc.annotations || doc.annotations.length === 0) {
//         setAnnotations([]);
//         return;
//       }
//       setAnnotations(doc.annotations);
//     });
//   }, [url, videoId]);

//   useEffect(() => {
//     const canvas = fabricRef.current;
//     if (!canvas) return;
//     let drawing = false;
//     let shape = null;
//     let startX = 0;
//     let startY = 0;
//     const moveDown = (opt) => {
//       if (!canvas || tool == "select") return;
//       if (!activeRangeRef.current) {
//         alert("Select a time range first");
//         return;
//       }
//       const { start, end } = activeRangeRef.current;
//       const t = videoRef.current.currentTime;
//       if (t < start || t > end) {
//         alert("Please draw within the selected time range");
//         return;
//       }
//       videoRef.current.pause();
//       isDrawingRef.current = true;
//       if (tool !== "text") {
//         drawing = true;
//         canvas.discardActiveObject();
//       }
//       const p = canvas.getViewportPoint(opt.e);
//       startX = p.x;
//       startY = p.y;
//       startTimeRef.current = videoRef.current.currentTime;
//       if (tool == "rectangle") {
//         shape = new fabric.Rect({
//           width: 1,
//           height: 1,
//           left: startX,
//           top: startY,
//           fill: "transparent",
//           stroke: color,
//           strokeWidth: 2,
//           selectable: false,
//           evented: false
//         });
//       }
//       if (tool == 'circle') {
//         shape = new fabric.Ellipse({
//           rx: 1,
//           ry: 1,
//           left: startX,
//           top: startY,
//           originX: "center",
//           originY: "center",
//           fill: "transparent",
//           stroke: color,
//           strokeWidth: 2,
//           selectable: false,
//           evented: false
//         });
//       }
//       if (tool == "rambus") {
//         shape = new fabric.Polygon([
//           { x: 0, y: 0 },
//           { x: 0, y: 0 },
//           { x: 0, y: 0 },
//           { x: 0, y: 0 },
//         ], {
//           left: startX,
//           top: startY,
//           fill: "transparent",
//           stroke: color,
//           strokeWidth: 2,
//           selectable: false,
//           evented: false
//         })
//       }
//       if (tool === "text") {
//         if (!activeRangeRef.current) {
//           alert("Select a time range first");
//           return;
//         }
//         const { start, end } = activeRangeRef.current;
//         const t = videoRef.current.currentTime;
//         if (t < start || t > end) {
//           alert("Please add text within selected time range");
//           return;
//         }
//         videoRef.current.pause();
//         const text = new fabric.IText("", {
//           left: startX,
//           top: startY,
//           fill: color,
//           fontSize: 22,
//           selectable: true,
//           editable: true,
//         });
//         canvas.add(text);
//         canvas.setActiveObject(text);
//         text.enterEditing();
//         text.hiddenTextarea?.focus();
//         isDrawingRef.current = true;
//         text.on("editing:exited", async () => {
//           if (!text.text.trim()) {
//             canvas.remove(text);
//             isDrawingRef.current = false;
//             return;
//           }
//           const annotationData = SerializeAnnotations(
//             text,
//             fabricRef.current,
//             start,
//             end,
//             "text"
//           );
//           try {
//             const res = await axios.post(
//               "http://localhost:3000/api/annotations/create",
//               { videoId, annotations: [annotationData] }
//             );

//             canvas.remove(text);
//             setAnnotations(res.data.annotations);

//           } catch (error) {
//             console.error("Error saving text:", error);
//             canvas.remove(text);
//           }

//           isDrawingRef.current = false;
//         });

//         return;
//       }
//       if (tool === "draw") {
//         canvas.isDrawingMode = true;
//         const brush = new fabric.PencilBrush(canvas);
//         brush.color = color;
//         brush.width = 3;
//         canvas.freeDrawingBrush = brush;
//       } else {
//         canvas.isDrawingMode = false;
//       }
//       if (shape) {
//         canvas.add(shape);
//         currentShapeRef.current = shape;
//       }
//     }
//     const onMouseMove = (opt) => {
//       if (!drawing || !shape) return;
//       const p = canvas.getViewportPoint(opt.e);
//       const w = p.x - startX;
//       const h = p.y - startY;
//       if (tool == "rectangle") {
//         shape.set({
//           width: Math.abs(w),
//           height: Math.abs(h),
//           left: Math.min(p.x, startX),
//           top: Math.min(p.y, startY),
//         });
//       }
//       if (tool == "circle") {
//         shape.set({
//           rx: Math.max(1, Math.abs(w) / 2),
//           ry: Math.max(1, Math.abs(h) / 2),
//           left: startX + w / 2,
//           top: startY + h / 2
//         });
//       }
//       if (tool === "rambus") {
//         const absW = Math.abs(w);
//         const absH = Math.abs(h);
//         shape.set({
//           left: Math.min(startX, p.x),
//           top: Math.min(startY, p.y),
//           points: [
//             { x: absW / 2, y: 0 },
//             { x: absW, y: absH / 2 },
//             { x: absW / 2, y: absH },
//             { x: 0, y: absH / 2 },
//           ],
//         });
//       }
//       if (tool === "draw") {
//         const points = shape.path;
//         const lastPoint = points[points.length - 1];
//         if (lastPoint[1] != 'M') {
//           shape.path.push(['L', p.x, p.y]);
//         }
//         else {
//           shape.path.push(['M', p.x, p.y]);
//         }
//         shape.set({
//           width: Math.abs(w),
//           height: Math.abs(h),
//           left: Math.min(p.x, startX),
//           top: Math.min(p.y, startY)
//         })
//       }
//       canvas.requestRenderAll();
//     }
//     const mouseUp = async () => {
//       if (tool === "text") return;
//       drawing = false;
//       const shape = currentShapeRef.current;
//       if (!shape) return;
//       shape.setCoords();
//       if (!activeRangeRef.current) {
//         canvas.remove(shape);
//         currentShapeRef.current = null;
//         isDrawingRef.current = false;
//         return;
//       }
//       const { start, end } = activeRangeRef.current;
//       const annotationData = SerializeAnnotations(
//         shape,
//         fabricRef.current,
//         start,
//         end,
//         tool
//       );
//       if (!annotationData) return;
//       console.log("Saving annotation:", start, end);
//       try {
//         const res = await axios.post(
//           "http://localhost:3000/api/annotations/create",
//           { videoId, annotations: [annotationData] }
//         );
//         setAnnotations(res.data.annotations);
//         console.log("Fetched annotations:", res.data.annotations);
//         canvas.remove(shape);
//       } catch (error) {
//         console.error("Error saving annotation:", error);
//         canvas.remove(shape);
//       }
//       currentShapeRef.current = null;
//       isDrawingRef.current = false;
//       canvas.discardActiveObject();
//       canvas.requestRenderAll();
//     };
//     canvas.on("mouse:down", moveDown);
//     canvas.on("mouse:move", onMouseMove);
//     canvas.on("mouse:up", mouseUp);
//     return () => {
//       canvas.off("mouse:down", moveDown);
//       canvas.off("mouse:move", onMouseMove);
//       canvas.off("mouse:up", mouseUp);
//     }
//   }, [tool, videoId]);
//   const renderAnnotation = (a, canvas) => {
//     const vw = canvas.getWidth();
//     const vh = canvas.getHeight();
//     let shape;
//     if (a.data.shapeType === "rectangle") {
//       shape = new fabric.Rect({
//         left: a.position.x * vw,
//         top: a.position.y * vh,
//         width: a.size.width * vw,
//         height: a.size.height * vh,
//         fill: a.data.fillColor,
//         stroke: a.data.strokeColor,
//         strokeWidth: a.data.strokeWidth,
//         selectable: false
//       });
//     }
//     if (a.data.shapeType === "circle") {
//       shape = new fabric.Ellipse({
//         left: a.position.x * vw,
//         top: a.position.y * vh,
//         rx: (a.size.width * vw) / 2,
//         ry: (a.size.height * vh) / 2,
//         fill: a.data.fillColor,
//         stroke: a.data.strokeColor,
//         strokeWidth: a.data.strokeWidth,
//         selectable: false
//       });
//     }

//     if (a.data.shapeType === "rambus") {
//       const w = a.size.width * vw;
//       const h = a.size.height * vh;
//       shape = new fabric.Polygon([
//         { x: w / 2, y: 0 },
//         { x: w, y: h / 2 },
//         { x: w / 2, y: h },
//         { x: 0, y: h / 2 }
//       ], {
//         left: a.position.x * vw,
//         top: a.position.y * vh,
//         fill: a.data.fillColor,
//         stroke: a.data.strokeColor,
//         strokeWidth: a.data.strokeWidth,
//         selectable: false
//       });
//     }

//     if (a.data.shapeType === "draw") {
//       shape = new fabric.Path(a.data.paths, {
//         fill: a.data.fillColor,
//         stroke: a.data.strokeColor,
//         strokeWidth: a.data.strokeWidth,
//         selectable: false,
//         width: a.size.width * vw,
//         height: a.size.height * vh,
//         left: a.position.x * vw,
//         top: a.position.y * vh,
//       })
//     }
//     if (a.data.shapeType === "text") {
//       shape = new fabric.IText(a.data.text, {
//         left: a.position.x * vw,
//         top: a.position.y * vh,
//         fill: a.data.fillColor,
//         fontSize: a.data.fontSize,
//         selectable: tool === "select",
//         evented: true,
//         editable: false
//       });
//     }
//     if (shape) {
//       shape.annotationId = a._id;
//       canvas.add(shape);
//     }
//     return shape;
//   }

//   useEffect(() => {
//     const video = videoRef.current;
//     const canvas = fabricRef.current;
//     if (!video || !canvas) return;
//     const onTimeUpdate = () => {
//       if (isDrawingRef.current) return;
//       const currentTime = video.currentTime;
//       let currentRange = null;
//       for (const thumbnail of thumbnails) {
//         if (currentTime >= thumbnail.start && currentTime <= thumbnail.end) {
//           currentRange = { start: thumbnail.start, end: thumbnail.end };
//           break;
//         }
//       }
//       const matchingNote = allNotes.find(
//         (note) =>
//           currentTime >= note.startTime &&
//           currentTime <= note.endTime
//       );

//       if (matchingNote) {
//         setActiveNotes({
//           start: matchingNote.startTime,
//           end: matchingNote.endTime,
//           content: matchingNote.content,
//         });
//         setCurrentNoteRange({
//           start: matchingNote.startTime,
//           end: matchingNote.endTime,
//         });
//         setShowNotes(true);
//       } else {
//         setShowNotes(false);
//       }
//       const objectsToRemove = [];
//       canvas.getObjects().forEach(obj => {
//         if (!obj.annotationId) return;
//         const annotation = annotations.find(a => a._id === obj.annotationId);
//         const shouldRemove = !annotation ||
//           currentTime < annotation.startTime ||
//           currentTime > annotation.endTime ||
//           (currentRange && (
//             Math.abs(annotation.startTime - currentRange.start) > 0.1 ||
//             Math.abs(annotation.endTime - currentRange.end) > 0.1
//           ));
//         if (shouldRemove) {
//           objectsToRemove.push(obj);
//           renderedAnnotationRef.current.delete(obj.annotationId);
//         }
//       });
//       objectsToRemove.forEach(obj => canvas.remove(obj));
//       annotations.forEach(annotation => {
//         const isInTimeRange =
//           currentTime >= annotation.startTime &&
//           currentTime <= annotation.endTime;
//         if (isInTimeRange &&
//           !renderedAnnotationRef.current.has(annotation._id)) {
//           const shape = renderAnnotation(annotation, canvas);
//           if (shape) {
//             renderedAnnotationRef.current.set(annotation._id, shape);
//           }
//         }
//       });
//       canvas.requestRenderAll();
//       if (thumbnailContainerRef.current && video.duration) {
//         const container = thumbnailContainerRef.current;
//         const progress = video.currentTime / video.duration;
//         const maxScroll = container.scrollWidth - container.clientWidth;
//         container.scrollLeft = progress * maxScroll;
//       }
//       if (progressBarRef.current && video.duration) {
//         const percent = (video.currentTime / video.duration) * 100;
//         progressBarRef.current.style.left = `${percent}%`;
//       }
//     };
//     video.addEventListener("timeupdate", onTimeUpdate);
//     return () => video.removeEventListener("timeupdate", onTimeUpdate);
//   }, [annotations, thumbnails, allNotes]);
//   const handleFilechange = (e) => {
//     const selectedFiles = e.target.files[0];
//     if (!selectedFiles) return;
//     if (!selectedFiles.type.endsWith("mp4")) {
//       console.log("select only video files");
//       return;
//     }
//     setVideofile(selectedFiles);
//   }
//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append("video", videofile);
//     const res = await axios.post("http://localhost:3000/api/cloudinary/upload", formData);
//     if (res) {
//       console.log("video is uploaded to cloudinary successfully");
//       console.log(res.data.video.url);
//       setUrl(res.data.video.url);
//       setThumbnails(res.data.thumbnails);
//       setVideoId(res.data.video._id);
//     }
//     else {
//       console.log("there is an error while uploading");
//     }
//   }
//   const handleNotesClick = () => {
//     if (!activeRangeRef) {
//       alert("select the time period");
//       return;
//     }
//     const { start, end } = activeRangeRef.current;
//     setCurrentNoteRange({ start, end });
//     setShowNotes(true);
//     axios.get(`http://localhost:3000/api/annotations/getNotes/${videoId}`, { params: { start, end } }).then(res => {
//       if (res.data) {
//         setNotes(res.data);
//       }
//       else {
//         setNotes([]);
//       }
//     });
//   }
//   useEffect(() => {
//     if (!fabricRef.current || !videoRef.current) return;
//     const canvas = fabricRef.current;
//     const video = videoRef.current;
//     const resizeCanvas = () => {
//       const rect = video.getBoundingClientRect();
//       canvas.setDimensions({
//         width: rect.width,
//         height: rect.height,
//       });
//       canvas.calcOffset();
//       canvas.requestRenderAll();
//     };
//     video.addEventListener("loadedmetadata", resizeCanvas);
//     window.addEventListener("resize", resizeCanvas);
//     return () => {
//       video.removeEventListener("loadedmetadata", resizeCanvas);
//       window.removeEventListener("resize", resizeCanvas);
//     };
//   }, []);
//   useEffect(() => {
//     if (!videoId) return;
//     axios.get(`http://localhost:3000/api/annotations/getNotes/${videoId}`).then(res => {
//       setAllNotes(res.data || []);

//     }).catch(err => {
//       console.log("Error fetching notes:", err);
//     })

//   }, [videoId]);
//   useEffect(() => {
//     const mouseMove = (e) => {
//       if (!isDraggingRange || !videoRef.current) return;
//       const container = thumbnailContainerRef.current;
//       const rect = container.getBoundingClientRect();
//       const progress = (e.clientX - rect.left) / rect.width;
//       const newStart = progress * videoRef.current.duration;
//       const duration = range.end - range.start;
//       setRange({
//         start: Math.max(0, newStart),
//         end: Math.min(videoRef.current.duration, newStart + duration)
//       })

//     };
//     const handleMoveUp = () => {
//       if (isDraggingRange) {
//         activeRangeRef.current = range;
//         setIsDraggingRange(false);
//       }
//     };
//     window.addEventListener("mousemove", mouseMove);
//     window.addEventListener("mouseup", handleMoveUp);
//     return () => {
//       window.removeEventListener("mousemove", mouseMove);
//       window.removeEventListener("mouseup", handleMoveUp);
//     }



//   }, [isDraggingRange, range])
//   const handlePlayPause = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     }
//     else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   }
//   const handleStop = () => {
//     const video = videoRef.current;
//     if (!video) return;
//     video.pause();
//     video.currentTime = 0;
//     setIsPlaying(false);

//   }
//   const handleDownload = async () => {
//     if (!videoId) return alert("Upload video first");
//     const res = await fetch(
//       `http://localhost:3000/api/export/${videoId}`,
//       { method: "POST" }
//     );
//     const blob = await res.blob();
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "annotated-video.mp4";
//     a.click();
//   };
//   return (
//     <div className='flex gap-4 top-4'>
//       <div className="gap-2">
//         <input type="file" ref={fileRef} accept="video/*" style={{ display: "none" }} onChange={handleFilechange} />
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md h-12 mt-2 mr-2" onClick={() => fileRef.current.click()}>Add video</button>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md h-12 mt-2" onClick={handleUpload}>upload</button>
//       </div>
//       <div className='w-full max-w-[900px] h-[600px] mt-12 '>
//         <div className="p-6">
//           <div className="mb-4 flex gap-2">
//             <button onClick={() => setTool("select")}>Select</button>
//             <button onClick={() => setTool("rectangle")}>Rectangle</button>
//             <button onClick={() => setTool("circle")}>Circle</button>
//             <button onClick={() => setTool("rambus")}>Rhombus</button>
//             <button onClick={() => setTool("draw")}>Draw</button>
//             <button onClick={() => setTool("text")}>Text</button>
//             <button onClick={handleNotesClick}>Notes</button>
//             <button onClick={handleDownload} className='text-white bg-green-500 px-4 py-2 rounded-lg'>Download</button>
//           </div>
//           <div className="flex gap-2 items-center mb-6">
//             {["red", "blue", "green", "yellow", "black", "white", "purple"].map(c => (
//               <div
//                 key={c}
//                 onClick={() => setColor(c)}
//                 className={`w-6 h-6 rounded-full cursor-pointer border-2 ${color === c ? "border-black scale-110" : "border-gray-300"
//                   }`}
//                 style={{ backgroundColor: c }}
//               />
//             ))}
//           </div>
//           <div
//             className="relative"
//             style={{ width: 900, height: 600 }}
//           >
//             <video
//               ref={videoRef}
//               src={url}
//               controls
//               className="absolute top-0 left-0 w-full h-full object-contain"
//             />
//             <canvas
//               ref={canvasRef}
//               className="absolute top-0 left-0 z-10"
//             />
//           </div>
//           <div className='flex gap-3 mb-4 mt-4'>
//             <button onClick={handlePlayPause} className="bg-green-500 text-white px-4 py-2 rounded-md">{isPlaying ? "Pause" : "Play"}</button>
//             <button onClick={handleStop} className='bg-red-400 text-white px-4 py-2 rounded-md'>
//               Stop
//             </button>
//           </div>
//           {/* <div className='flex mt-4 gap-2 overflow-x-auto'>
//             {
//               thumbnails.map(t => (
//                 <div key={t.start} onClick={() => {
//                   activeRangeRef.current = {
//                     start: t.start,
//                     end: t.end
//                   };
//                   const existingnotes = notes.find(n => n.startTime === t.start && n.endTime === t.end);
//                   if (existingnotes) {
//                     setActiveNotes(existingnotes);
//                     setShowNotes(true);
//                   }else {
//                     setShowNotes(false);
//                   }
//                   setActiveNotes(existingnotes || {
//                     start: t.start,
//                     end: t.end,
//                     content: "",
//                     images: []
//                   });
//                   setShowNotes(false);
//                   console.log("Active range set:", activeRangeRef.current);
//                   const canvas = fabricRef.current;
//                   renderedAnnotationRef.current.forEach(obj => canvas.remove(obj));
//                   renderedAnnotationRef.current.clear();
//                   canvas.requestRenderAll();
//                   videoRef.current.currentTime = t.start;
//                   videoRef.current.play().catch(() => { });
//                 }}
//                   className='w-18 h-18 cursor-pointer'>
//                   <img src={t.url} alt={`${t.start}s - ${t.end}s`} />
//                   <p>{t.start}s - {t.end}s</p>
//                 </div>
//               ))
//             }
//           </div> */}
//           <div
//             ref={thumbnailContainerRef}
//             className="relative flex mt-4 gap-2 overflow-x-auto border p-2 bg-gray-100 h-20"
//           >
//             <div
//               ref={progressBarRef}
//               className="absolute top-0 bottom-0 w-[2px] bg-red-600 z-20 pointer-events-none"
//               style={{ left: "0%" }}
//             />
//             {videoRef.current?.duration && (
//               <div
//                 className="absolute top-0 bottom-0 bg-blue-400 bg-opacity-30 z-10 cursor-grab"
//                 style={{
//                   left: `${(range.start / videoRef.current.duration) * 100}%`,
//                   width: `${((range.end - range.start) / videoRef.current.duration) * 100}%`
//                 }}
//                 onMouseDown={() => setIsDraggingRange(true)}
//               />
//             )}
//             {thumbnails.map((t) => (
//               <div
//                 key={t.start}
//                 onClick={() => {
//                   activeRangeRef.current = {
//                     start: t.start,
//                     end: t.end
//                   };
//                   setRange({ start: t.start, end: t.end });
//                   const existingnotes = notes.find(
//                     (n) => n.startTime === t.start && n.endTime === t.end
//                   );
//                   if (existingnotes) {
//                     setActiveNotes(existingnotes);
//                     setShowNotes(true);
//                   } else {
//                     setShowNotes(false);
//                   }
//                   setActiveNotes(
//                     existingnotes || {
//                       start: t.start,
//                       end: t.end,
//                       content: "",
//                       images: []
//                     }
//                   );
//                   const canvas = fabricRef.current;
//                   renderedAnnotationRef.current.forEach((obj) =>
//                     canvas.remove(obj)
//                   );
//                   renderedAnnotationRef.current.clear();
//                   canvas.requestRenderAll();

//                   videoRef.current.currentTime = t.start;
//                   videoRef.current.play().catch(() => { });
//                 }}
//                 className="min-w-[100px] cursor-pointer relative"
//               >
//                 <img
//                   src={t.url}
//                   alt={`${t.start}s - ${t.end}s`}
//                   className="w-[100px] h-[70px] object-cover rounded"
//                 />
//                 <p className="text-xs text-center">
//                   {t.start}s - {t.end}s
//                 </p>
//               </div>
//             ))}
//           </div>
//           {showNotes && (
//             <div className="mt-4 p-4 border rounded-md bg-gray-100">
//               <h3 className='text-lg font-semibold mb-2'>Notes for ({activeRangeRef.current?.start}s-{activeRangeRef.current?.end}s)</h3>
//               <div
//                 contentEditable
//                 className="border p-3 min-h-[200px] outline-none"
//                 dangerouslySetInnerHTML={{ __html: activeNotes.content }}
//                 onInput={(e) => setActiveNotes(prev => ({
//                   ...prev,
//                   content: e.currentTarget.innerHTML
//                 }))}
//               />
//               <div className='flex gap-3 mt-2'>
//                 <input type="file" accept='image/*' onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;
//                   const reader = new FileReader();
//                   reader.onload = (e) => {
//                     setActiveNotes(prev => prev + `<img src="${reader.result}" style="max-width:200px;" />`);
//                   }
//                   reader.readAsDataURL(file);
//                 }} />
//                 <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => {
//                   axios.post("http://localhost:3000/api/annotations/saveNotes", {
//                     videoId,
//                     start: activeRangeRef.current.start,
//                     end: activeRangeRef.current.end,
//                     content: activeNotes.content
//                   }
//                   ).then(res => {
//                     alert("Notes saves successfully");
//                   })
//                 }}
//                 >Save Notes</button>
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                   onClick={() => setShowNotes(false)}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div >
//   )
// }

// export default App







// import React from "react";
// import { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import * as fabric from "fabric";

// const API = "http://localhost:3000";

// const COLORS = [
//   "#ef4444","#f97316","#eab308","#22c55e",
//   "#06b6d4","#3b82f6","#a855f7","#ec4899",
//   "#ffffff","#000000",
// ];

// const TOOLS = [
//   { id: "select",    label: "Select"   },
//   { id: "rectangle", label: "Rect"     },
//   { id: "circle",    label: "Circle"   },
//   { id: "rambus",    label: "Rhombus"  },
//   { id: "draw",      label: "Draw"     },
//   { id: "text",      label: "Text"     },
//   { id: "eraser",    label: "Eraser"   },
// ];

// const TOOL_ICONS = {
//   select:"↖", rectangle:"▭", circle:"◯", rambus:"◇", draw:"✏", text:"T", eraser:"⌫"
// };

// function fmtTime(s) {
//   if (!s && s !== 0) return "0:00";
//   return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
// }

// function Btn({ children, onClick, disabled, variant="ghost", style:sx={} }) {
//   const palettes = {
//     blue:  { background:"#1f6feb", color:"#fff", border:"none" },
//     green: { background:"#238636", color:"#fff", border:"none" },
//     red:   { background:"#da3633", color:"#fff", border:"none" },
//     ghost: { background:"transparent", color:"#8b949e", border:"1px solid #30363d" },
//   };
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       style={{
//         display:"inline-flex", alignItems:"center", gap:5,
//         borderRadius:6, padding:"5px 12px", cursor:disabled?"not-allowed":"pointer",
//         fontSize:12, fontWeight:600, whiteSpace:"nowrap",
//         opacity:disabled?0.45:1, transition:"opacity .1s",
//         ...palettes[variant], ...sx,
//       }}
//     >{children}</button>
//   );
// }

// export default function App() {
//   /* refs */
//   const fileInputRef    = useRef(null);
//   const videoRef        = useRef(null);
//   const canvasElRef     = useRef(null);
//   const fabricRef       = useRef(null);
//   const activeRangeRef  = useRef(null);   // {start,end}
//   const isDrawingRef    = useRef(false);
//   const currentShapeRef = useRef(null);
//   const renderedRef     = useRef(new Map());

//   /* state */
//   const [videoFile,    setVideoFile]    = useState(null);
//   const [videoUrl,     setVideoUrl]     = useState("");
//   const [videoId,      setVideoId]      = useState(null);
//   const [thumbnails,   setThumbnails]   = useState([]);
//   const [annotations,  setAnnotations]  = useState([]);
//   const [allNotes,     setAllNotes]     = useState([]);

//   const [tool,         setTool]         = useState("select");
//   const [color,        setColor]        = useState("#ef4444");
//   const [strokeWidth,  setStrokeWidth]  = useState(2);
//   const [fillEnabled,  setFillEnabled]  = useState(false);

//   const [isPlaying,    setIsPlaying]    = useState(false);
//   const [currentTime,  setCurrentTime]  = useState(0);
//   const [duration,     setDuration]     = useState(0);

//   const [activeSegment,setActiveSegment] = useState(null);
//   const [showNotes,    setShowNotes]    = useState(false);
//   const [noteContent,  setNoteContent]  = useState("");
//   const [noteSaved,    setNoteSaved]    = useState(false);

//   const [uploading,    setUploading]    = useState(false);
//   const [exporting,    setExporting]    = useState(false);
//   const [uploadPct,    setUploadPct]    = useState(0);
//   const [status,       setStatus]       = useState("");

//   /* ── 1. Init Fabric ───────────────────────────────────────────── */
//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasElRef.current, {
//       selection: false,
//       preserveObjectStacking: true,
//     });
//     canvas.setDimensions({ width: 880, height: 495 });
//     fabricRef.current = canvas;
//     return () => { try { canvas.dispose(); } catch(_){} };
//   }, []);

//   /* ── 2. Keep canvas same size as video element ────────────────── */
//   useEffect(() => {
//     const video  = videoRef.current;
//     const canvas = fabricRef.current;
//     if (!video || !canvas) return;
//     const sync = () => {
//       const r = video.getBoundingClientRect();
//       if (r.width > 0) {
//         canvas.setDimensions({ width: r.width, height: r.height });
//         canvas.calcOffset();
//         canvas.requestRenderAll();
//       }
//     };
//     ["loadedmetadata","loadeddata","resize"].forEach(ev =>
//       (ev === "resize" ? window : video).addEventListener(ev, sync)
//     );
//     return () => {
//       ["loadedmetadata","loadeddata"].forEach(ev => video.removeEventListener(ev, sync));
//       window.removeEventListener("resize", sync);
//     };
//   }, []);

//   /* ── 3. Load annotations & notes after upload ─────────────────── */
//   useEffect(() => {
//     if (!videoId) return;
//     axios.get(`${API}/api/annotations/${videoId}`)
//       .then(r => setAnnotations(r.data?.annotations?.annotations || []))
//       .catch(() => {});
//     axios.get(`${API}/api/annotations/getAllNotes/${videoId}`)
//       .then(r => setAllNotes(r.data || []))
//       .catch(() => {});
//   }, [videoId]);

//   /* ── 4. Drawing tools ─────────────────────────────────────────── */
//   useEffect(() => {
//     const canvas = fabricRef.current;
//     if (!canvas) return;

//     canvas.isDrawingMode = false;
//     canvas.selection     = tool === "select";

//     if (tool === "draw") {
//       canvas.isDrawingMode = true;
//       const brush = new fabric.PencilBrush(canvas);
//       brush.color = color;
//       brush.width = strokeWidth;
//       canvas.freeDrawingBrush = brush;
//     }

//     /* ---- helpers ---- */
//     const getRange = () => {
//       if (!activeRangeRef.current) {
//         alert("Click a thumbnail below to select a time segment first.");
//         return null;
//       }
//       return activeRangeRef.current;
//     };

//     const persistAnnotation = async (shape, range, toolName) => {
//       const vw  = canvas.getWidth();
//       const vh  = canvas.getHeight();
//       const obj = shape.toObject ? shape.toObject() : {};
//       const sx  = obj.scaleX || 1;
//       const sy  = obj.scaleY || 1;

//       const payload = {
//         type:      toolName,
//         startTime: range.start,
//         endTime:   range.end,
//         position:  { x: (obj.left  || 0) / vw, y: (obj.top   || 0) / vh },
//         size:      { width:  ((obj.width  || 1) * sx) / vw,
//                      height: ((obj.height || 1) * sy) / vh },
//         rotation:  obj.angle || 0,
//         draggable: true,
//         visible:   true,
//         data: {
//           shapeType:   toolName,
//           strokeColor: obj.stroke       || color,
//           fillColor:   obj.fill         || "transparent",
//           strokeWidth: obj.strokeWidth  || strokeWidth,
//           text:        obj.text         || null,
//           fontSize:    obj.fontSize     || null,
//           paths:       toolName === "draw" ? obj.path : null,
//         },
//       };

//       try {
//         const res = await axios.post(`${API}/api/annotations/create`,
//           { videoId, annotations: [payload] });
//         setAnnotations(res.data.annotations || []);
//         setStatus("✓ Annotation saved");
//         setTimeout(() => setStatus(""), 2000);
//       } catch (e) {
//         console.error(e);
//         setStatus("❌ Save failed");
//       }
//     };

//     /* ---- mouse:down ---- */
//     let startX = 0, startY = 0, drawing = false;

//     const onDown = (opt) => {
//       if (tool === "select") return;
//       if (tool === "draw")   return; // handled by path:created

//       /* eraser */
//       if (tool === "eraser") {
//         const target = canvas.findTarget(opt.e);
//         if (!target) return;
//         const id = target.annotationId;
//         canvas.remove(target);
//         canvas.requestRenderAll();
//         if (id) {
//           renderedRef.current.delete(id);
//           axios.delete(`${API}/api/annotations/${videoId}/${id}`)
//             .then(r => setAnnotations(r.data.annotations || []))
//             .catch(() => {});
//         }
//         return;
//       }

//       const range = getRange();
//       if (!range) return;

//       /* text */
//       if (tool === "text") {
//         const p = canvas.getViewportPoint(opt.e);
//         videoRef.current?.pause();
//         const txt = new fabric.IText("", {
//           left: p.x, top: p.y,
//           fill: color, fontSize: 20,
//           selectable: true, editable: true,
//         });
//         canvas.add(txt);
//         canvas.setActiveObject(txt);
//         txt.enterEditing();
//         txt.hiddenTextarea?.focus();
//         isDrawingRef.current = true;
//         txt.on("editing:exited", async () => {
//           if (!txt.text.trim()) { canvas.remove(txt); isDrawingRef.current = false; return; }
//           await persistAnnotation(txt, range, "text");
//           canvas.remove(txt);
//           isDrawingRef.current = false;
//         });
//         return;
//       }

//       /* shapes */
//       videoRef.current?.pause();
//       isDrawingRef.current = true;
//       drawing = true;
//       const p = canvas.getViewportPoint(opt.e);
//       startX = p.x; startY = p.y;

//       const fill = fillEnabled ? color : "transparent";
//       if (tool === "rectangle") {
//         currentShapeRef.current = new fabric.Rect({
//           left: startX, top: startY, width: 1, height: 1,
//           fill, stroke: color, strokeWidth,
//           selectable: false, evented: false,
//         });
//       } else if (tool === "circle") {
//         currentShapeRef.current = new fabric.Ellipse({
//           left: startX, top: startY, rx: 1, ry: 1,
//           originX: "left", originY: "top",
//           fill, stroke: color, strokeWidth,
//           selectable: false, evented: false,
//         });
//       } else if (tool === "rambus") {
//         currentShapeRef.current = new fabric.Polygon(
//           [{x:0,y:0},{x:0,y:0},{x:0,y:0},{x:0,y:0}],
//           { left: startX, top: startY, fill, stroke: color, strokeWidth,
//             selectable: false, evented: false }
//         );
//       }
//       if (currentShapeRef.current) canvas.add(currentShapeRef.current);
//     };

//     /* ---- mouse:move ---- */
//     const onMove = (opt) => {
//       if (!drawing || !currentShapeRef.current) return;
//       const p = canvas.getViewportPoint(opt.e);
//       const w = p.x - startX, h = p.y - startY;
//       const s = currentShapeRef.current;

//       if (tool === "rectangle") {
//         s.set({ left: Math.min(p.x,startX), top: Math.min(p.y,startY),
//                 width: Math.abs(w), height: Math.abs(h) });
//       } else if (tool === "circle") {
//         s.set({ left: Math.min(p.x,startX), top: Math.min(p.y,startY),
//                 rx: Math.abs(w)/2, ry: Math.abs(h)/2 });
//       } else if (tool === "rambus") {
//         const aw=Math.abs(w), ah=Math.abs(h);
//         s.set({ left: Math.min(startX,p.x), top: Math.min(startY,p.y),
//                 points:[{x:aw/2,y:0},{x:aw,y:ah/2},{x:aw/2,y:ah},{x:0,y:ah/2}] });
//       }
//       canvas.requestRenderAll();
//     };

//     /* ---- mouse:up ---- */
//     const onUp = async () => {
//       if (!drawing) return;
//       drawing = false;
//       isDrawingRef.current = false;
//       const s = currentShapeRef.current;
//       currentShapeRef.current = null;
//       if (!s) return;
//       s.setCoords();
//       const range = activeRangeRef.current;
//       if (!range) { canvas.remove(s); return; }
//       await persistAnnotation(s, range, tool);
//       canvas.remove(s);
//       canvas.requestRenderAll();
//     };

//     /* ---- path:created (pencil / draw) ---- */
//     const onPath = async (opt) => {
//       isDrawingRef.current = false;
//       const range = activeRangeRef.current;
//       if (!range) { canvas.remove(opt.path); return; }
//       await persistAnnotation(opt.path, range, "draw");
//       canvas.remove(opt.path);
//       canvas.requestRenderAll();
//     };

//     canvas.on("mouse:down",   onDown);
//     canvas.on("mouse:move",   onMove);
//     canvas.on("mouse:up",     onUp);
//     canvas.on("path:created", onPath);
//     return () => {
//       canvas.off("mouse:down",   onDown);
//       canvas.off("mouse:move",   onMove);
//       canvas.off("mouse:up",     onUp);
//       canvas.off("path:created", onPath);
//     };
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [tool, color, strokeWidth, fillEnabled, videoId]);

//   /* ── 5. Render/remove annotations during playback ────────────── */
//   const renderAnnotation = useCallback((ann) => {
//     const canvas = fabricRef.current;
//     if (!canvas) return null;
//     const vw = canvas.getWidth(), vh = canvas.getHeight();
//     const { data:d, position:pos, size:sz } = ann;
//     const x = pos.x*vw, y = pos.y*vh, w = sz.width*vw, h = sz.height*vh;
//     const common = {
//       left: x, top: y,
//       fill:        d.fillColor   || "transparent",
//       stroke:      d.strokeColor || "#ff0000",
//       strokeWidth: d.strokeWidth || 2,
//       selectable: false, evented: false,
//       angle: ann.rotation || 0,
//     };
//     let shape = null;
//     if      (d.shapeType === "rectangle") shape = new fabric.Rect({...common, width:w, height:h});
//     else if (d.shapeType === "circle")    shape = new fabric.Ellipse({...common, rx:w/2, ry:h/2});
//     else if (d.shapeType === "rambus")    shape = new fabric.Polygon(
//       [{x:w/2,y:0},{x:w,y:h/2},{x:w/2,y:h},{x:0,y:h/2}], {...common});
//     else if (d.shapeType === "draw" && d.paths) shape = new fabric.Path(d.paths, {...common, width:w, height:h});
//     else if (d.shapeType === "text" && d.text)  shape = new fabric.IText(d.text, {
//       ...common, fill: d.strokeColor, fontSize: d.fontSize||20, editable:false});
//     if (shape) { shape.annotationId = ann._id; canvas.add(shape); }
//     return shape;
//   }, []);

//   useEffect(() => {
//     const video  = videoRef.current;
//     const canvas = fabricRef.current;
//     if (!video || !canvas) return;
//     const onTime = () => {
//       if (isDrawingRef.current) return;
//       const t = video.currentTime;
//       setCurrentTime(t);

//       /* remove stale */
//       const remove = [];
//       canvas.getObjects().forEach(obj => {
//         if (!obj.annotationId) return;
//         const ann = annotations.find(a => a._id === obj.annotationId);
//         if (!ann || t < ann.startTime || t > ann.endTime) {
//           remove.push(obj);
//           renderedRef.current.delete(obj.annotationId);
//         }
//       });
//       remove.forEach(o => canvas.remove(o));

//       /* add new */
//       annotations.forEach(ann => {
//         if (t >= ann.startTime && t <= ann.endTime && !renderedRef.current.has(ann._id)) {
//           const s = renderAnnotation(ann);
//           if (s) renderedRef.current.set(ann._id, s);
//         }
//       });
//       canvas.requestRenderAll();
//     };
//     video.addEventListener("timeupdate", onTime);
//     return () => video.removeEventListener("timeupdate", onTime);
//   }, [annotations, renderAnnotation]);

//   /* ── 6. Upload ────────────────────────────────────────────────── */
//   const handleUpload = async () => {
//     if (!videoFile) { alert("Choose a video first."); return; }
//     setUploading(true); setUploadPct(0);
//     const form = new FormData();
//     form.append("video", videoFile);
//     try {
//       const res = await axios.post(`${API}/api/cloudinary/upload`, form, {
//         onUploadProgress: e => setUploadPct(Math.round((e.loaded/e.total)*100)),
//       });
//       setVideoUrl(res.data.video.url);
//       setThumbnails(res.data.thumbnails || []);
//       setVideoId(res.data.video._id);
//       setDuration(res.data.video.duration || 0);
//       setStatus("Video uploaded ✓");
//       setTimeout(() => setStatus(""), 3000);
//     } catch { alert("Upload failed – is your server running?"); }
//     setUploading(false);
//   };

//   /* ── 7. Playback ──────────────────────────────────────────────── */
//   const handlePlayPause = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     if (v.paused) { v.play(); setIsPlaying(true); }
//     else          { v.pause(); setIsPlaying(false); }
//   };
//   const handleStop = () => {
//     const v = videoRef.current;
//     if (!v) return;
//     v.pause(); v.currentTime = 0; setIsPlaying(false);
//   };
//   const handleSeek = (e) => {
//     const r = e.currentTarget.getBoundingClientRect();
//     const t = Math.max(0, Math.min(1,(e.clientX-r.left)/r.width));
//     if (videoRef.current) videoRef.current.currentTime = t * (videoRef.current.duration||0);
//   };

//   /* ── 8. Select segment ────────────────────────────────────────── */
//   const selectSegment = (t) => {
//     activeRangeRef.current = { start: t.start, end: t.end };
//     setActiveSegment({ start: t.start, end: t.end });

//     // clear rendered objects
//     const canvas = fabricRef.current;
//     renderedRef.current.forEach(obj => canvas.remove(obj));
//     renderedRef.current.clear();
//     canvas.requestRenderAll();

//     if (videoRef.current) {
//       videoRef.current.currentTime = t.start;
//       videoRef.current.play().then(() => setIsPlaying(true)).catch(()=>{});
//     }

//     if (videoId) {
//       axios.get(`${API}/api/annotations/getNotes/${videoId}`,
//         { params: { start: t.start, end: t.end } })
//         .then(r => setNoteContent(r.data?.content || ""))
//         .catch(() => setNoteContent(""));
//     }
//   };

//   /* ── 9. Notes ─────────────────────────────────────────────────── */
//   const saveNote = async () => {
//     if (!videoId || !activeRangeRef.current) { alert("Select a segment first."); return; }
//     const { start, end } = activeRangeRef.current;
//     await axios.post(`${API}/api/annotations/saveNotes`,
//       { videoId, start, end, content: noteContent });
//     setNoteSaved(true);
//     setTimeout(() => setNoteSaved(false), 2000);
//     const r = await axios.get(`${API}/api/annotations/getAllNotes/${videoId}`);
//     setAllNotes(r.data || []);
//   };

//   /* ── 10. Export ───────────────────────────────────────────────── */
//   const handleDownload = async () => {
//     if (!videoId) { alert("Upload a video first."); return; }
//     setExporting(true);
//     setStatus("Rendering annotated video… this may take a minute.");
//     try {
//       const res = await fetch(`${API}/api/export/${videoId}`, { method:"POST" });
//       if (!res.ok) throw new Error(await res.text());
//       const blob = await res.blob();
//       const url  = URL.createObjectURL(blob);
//       const a    = document.createElement("a");
//       a.href = url; a.download = "annotated-video.mp4"; a.click();
//       URL.revokeObjectURL(url);
//       setStatus("Download started ✓");
//     } catch (e) { setStatus("Export failed: " + e.message); }
//     setExporting(false);
//     setTimeout(() => setStatus(""), 5000);
//   };

//   /* ── Render ───────────────────────────────────────────────────── */
//   const pct = duration > 0 ? (currentTime / duration) * 100 : 0;

//   return (
//     <div style={{display:"flex",flexDirection:"column",minHeight:"100vh",
//       background:"#0d1117",color:"#e6edf3",
//       fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",fontSize:13}}>

//       {/* TOP BAR */}
//       <div style={{display:"flex",alignItems:"center",gap:10,padding:"8px 16px",
//         borderBottom:"1px solid #21262d",background:"#161b22",flexWrap:"wrap"}}>

//         <span style={{fontWeight:700,fontSize:15,letterSpacing:"-0.02em",
//           background:"linear-gradient(90deg,#58a6ff,#bc8cff)",
//           WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
//           FrameMark
//         </span>

//         <input ref={fileInputRef} type="file" accept="video/mp4,video/*"
//           style={{display:"none"}} onChange={e => setVideoFile(e.target.files[0])} />
//         <Btn onClick={() => fileInputRef.current.click()} variant="ghost">
//           {videoFile ? `📁 ${videoFile.name.slice(0,22)}` : "Choose Video"}
//         </Btn>
//         <Btn onClick={handleUpload} disabled={!videoFile||uploading} variant="blue">
//           {uploading ? `Uploading ${uploadPct}%…` : "Upload"}
//         </Btn>

//         {status && (
//           <span style={{fontSize:12,color:"#58a6ff",padding:"2px 8px",
//             background:"rgba(88,166,255,.1)",borderRadius:4}}>{status}</span>
//         )}

//         <div style={{flex:1}}/>
//         <Btn onClick={handleDownload} disabled={!videoId||exporting} variant="green">
//           {exporting ? "Exporting…" : "⬇ Export Annotated Video"}
//         </Btn>
//       </div>

//       <div style={{display:"flex",flex:1}}>

//         {/* TOOLBAR */}
//         <div style={{width:52,background:"#161b22",borderRight:"1px solid #21262d",
//           display:"flex",flexDirection:"column",alignItems:"center",paddingTop:10,gap:3}}>
//           {TOOLS.map(t => (
//             <button key={t.id} onClick={() => setTool(t.id)} title={t.label}
//               style={{width:40,height:40,border:"none",borderRadius:8,cursor:"pointer",
//                 background:tool===t.id?"rgba(88,166,255,.18)":"transparent",
//                 color:tool===t.id?"#58a6ff":"#8b949e",
//                 display:"flex",flexDirection:"column",alignItems:"center",
//                 justifyContent:"center",gap:1}}>
//               <span style={{fontSize:15}}>{TOOL_ICONS[t.id]}</span>
//               <span style={{fontSize:8}}>{t.label}</span>
//             </button>
//           ))}
//           <div style={{flex:1}}/>
//           {/* colour dots */}
//           <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,paddingBottom:10}}>
//             {COLORS.map(c => (
//               <div key={c} onClick={() => setColor(c)}
//                 style={{width:18,height:18,borderRadius:"50%",cursor:"pointer",
//                   background:c,boxSizing:"border-box",
//                   border:color===c?"2.5px solid #fff":"2px solid transparent",
//                   transform:color===c?"scale(1.2)":"scale(1)",transition:"transform .1s"}} />
//             ))}
//           </div>
//         </div>

//         {/* MAIN */}
//         <div style={{flex:1,display:"flex",flexDirection:"column",
//           padding:12,gap:10,overflowY:"auto"}}>

//           {/* options row */}
//           <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
//             <span style={{color:"#8b949e",fontSize:11}}>Stroke:</span>
//             {[1,2,4,6].map(w => (
//               <button key={w} onClick={() => setStrokeWidth(w)}
//                 style={{width:26,height:26,border:"none",borderRadius:5,cursor:"pointer",
//                   fontWeight:700,fontSize:11,
//                   background:strokeWidth===w?"rgba(88,166,255,.2)":"transparent",
//                   color:strokeWidth===w?"#58a6ff":"#8b949e"}}>{w}</button>
//             ))}

//             <button onClick={() => setFillEnabled(f=>!f)}
//               style={{padding:"3px 10px",border:"1px solid #30363d",borderRadius:6,
//                 cursor:"pointer",fontSize:11,fontWeight:600,
//                 background:fillEnabled?"rgba(88,166,255,.15)":"transparent",
//                 color:fillEnabled?"#58a6ff":"#8b949e"}}>
//               Fill {fillEnabled?"ON":"OFF"}
//             </button>

//             <button onClick={() => {
//               if (!activeRangeRef.current) { alert("Select a segment first."); return; }
//               setShowNotes(n=>!n);
//             }}
//               style={{padding:"3px 10px",border:"1px solid #30363d",borderRadius:6,
//                 cursor:"pointer",fontSize:11,fontWeight:600,
//                 background:showNotes?"rgba(88,166,255,.15)":"transparent",
//                 color:showNotes?"#58a6ff":"#8b949e"}}>
//               📝 Notes
//             </button>

//             {/* current colour preview */}
//             <div style={{width:16,height:16,borderRadius:3,background:color,
//               border:"1px solid #30363d"}} />

//             {activeSegment && (
//               <span style={{color:"#58a6ff",background:"rgba(88,166,255,.1)",
//                 border:"1px solid rgba(88,166,255,.25)",borderRadius:12,
//                 padding:"2px 10px",fontSize:11,marginLeft:4}}>
//                 Segment: {activeSegment.start.toFixed(1)}s – {activeSegment.end.toFixed(1)}s
//               </span>
//             )}
//           </div>

//           {/* VIDEO + CANVAS */}
//           <div style={{position:"relative",background:"#000",
//             borderRadius:8,overflow:"hidden",lineHeight:0}}>
//             <video
//               ref={videoRef}
//               src={videoUrl}
//               style={{width:"100%",maxHeight:500,display:"block",objectFit:"contain"}}
//               onLoadedMetadata={e => setDuration(e.target.duration)}
//               onPlay={()=>setIsPlaying(true)}
//               onPause={()=>setIsPlaying(false)}
//             />
//             {/*
//               IMPORTANT: the canvas must sit exactly on top of the video.
//               We use position:absolute + width/height 100% so it perfectly overlaps.
//               pointerEvents:"auto" is critical — otherwise mouse events never reach Fabric.
//             */}
//             <canvas
//               ref={canvasElRef}
//               style={{
//                 position:"absolute",top:0,left:0,
//                 width:"100%",height:"100%",
//                 zIndex:10,
//                 pointerEvents:"auto",
//                 cursor: tool==="eraser"||tool==="draw"||tool==="text"
//                   ? "crosshair" : tool==="select" ? "default" : "crosshair",
//               }}
//             />
//           </div>

//           {/* SEEK + TRANSPORT */}
//           <div style={{display:"flex",flexDirection:"column",gap:6}}>
//             <div onClick={handleSeek}
//               style={{height:6,background:"#21262d",borderRadius:3,
//                 cursor:"pointer",position:"relative",userSelect:"none"}}>
//               <div style={{position:"absolute",top:0,left:0,height:"100%",
//                 width:`${pct}%`,background:"#58a6ff",borderRadius:3,
//                 pointerEvents:"none"}} />
//               <div style={{position:"absolute",top:"50%",left:`${pct}%`,
//                 transform:"translate(-50%,-50%)",width:12,height:12,
//                 borderRadius:"50%",background:"#58a6ff",
//                 boxShadow:"0 0 0 2px #0d1117",pointerEvents:"none"}} />
//             </div>
//             <div style={{display:"flex",alignItems:"center",gap:8}}>
//               <Btn onClick={handlePlayPause} variant="blue">
//                 {isPlaying ? "⏸ Pause" : "▶ Play"}
//               </Btn>
//               <Btn onClick={handleStop} variant="red">⏹ Stop</Btn>
//               <span style={{color:"#8b949e",fontSize:12}}>
//                 {fmtTime(currentTime)} / {fmtTime(duration)}
//               </span>
//             </div>
//           </div>

//           {/* TIMELINE THUMBNAILS */}
//           {thumbnails.length > 0 && (
//             <div>
//               <p style={{color:"#8b949e",fontSize:11,marginBottom:5,margin:"0 0 5px"}}>
//                 👇 Click a segment to select it, then draw on the video above
//               </p>
//               <div style={{display:"flex",gap:4,overflowX:"auto",padding:"4px 2px",
//                 scrollbarWidth:"thin",scrollbarColor:"#30363d transparent"}}>
//                 {thumbnails.map(t => {
//                   const active  = activeSegment?.start === t.start;
//                   const hasNote = allNotes.some(n => n.start===t.start && n.end===t.end);
//                   return (
//                     <div key={t.start} onClick={() => selectSegment(t)}
//                       style={{flexShrink:0,cursor:"pointer",position:"relative",
//                         userSelect:"none"}}>
//                       <img src={t.url} alt={`${t.start}s`}
//                         style={{width:88,height:55,objectFit:"cover",borderRadius:5,
//                           display:"block",transition:"all .15s",
//                           border:active?"2px solid #58a6ff":"2px solid transparent",
//                           opacity:active?1:0.65}} />
//                       <div style={{fontSize:9,textAlign:"center",marginTop:2,
//                         color:active?"#58a6ff":"#8b949e"}}>
//                         {t.start.toFixed(1)}s – {t.end.toFixed(1)}s
//                       </div>
//                       {hasNote && (
//                         <div title="Has note"
//                           style={{position:"absolute",top:3,right:3,width:7,height:7,
//                             borderRadius:"50%",background:"#f97316"}} />
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}

//           {/* NOTES PANEL */}
//           {showNotes && activeSegment && (
//             <div style={{background:"#161b22",border:"1px solid #21262d",
//               borderRadius:8,padding:14}}>
//               <div style={{display:"flex",justifyContent:"space-between",
//                 alignItems:"center",marginBottom:8}}>
//                 <span style={{fontWeight:600}}>
//                   📝 Notes — {activeSegment.start.toFixed(1)}s to {activeSegment.end.toFixed(1)}s
//                 </span>
//                 <button onClick={()=>setShowNotes(false)}
//                   style={{background:"none",border:"none",color:"#8b949e",
//                     cursor:"pointer",fontSize:18,lineHeight:1}}>×</button>
//               </div>
//               <textarea value={noteContent} onChange={e=>setNoteContent(e.target.value)}
//                 placeholder="Write notes for this segment…"
//                 style={{width:"100%",minHeight:90,background:"#0d1117",
//                   border:"1px solid #30363d",borderRadius:6,color:"#e6edf3",
//                   padding:"8px 12px",fontSize:13,resize:"vertical",
//                   outline:"none",fontFamily:"inherit",boxSizing:"border-box"}} />
//               <div style={{display:"flex",gap:8,marginTop:8}}>
//                 <Btn onClick={saveNote} variant="blue">{noteSaved?"Saved ✓":"Save"}</Btn>
//                 <Btn onClick={()=>setShowNotes(false)} variant="ghost">Close</Btn>
//               </div>
//             </div>
//           )}

//           {/* EMPTY STATE */}
//           {!videoUrl && (
//             <div style={{textAlign:"center",color:"#8b949e",padding:"48px 20px",
//               border:"2px dashed #21262d",borderRadius:12,marginTop:12}}>
//               <div style={{fontSize:44,marginBottom:14}}>🎬</div>
//               <p style={{fontWeight:700,fontSize:15,marginBottom:10,color:"#e6edf3"}}>
//                 Welcome to FrameMark
//               </p>
//               <ol style={{textAlign:"left",maxWidth:340,margin:"0 auto",
//                 lineHeight:2.2,fontSize:12}}>
//                 <li>Choose an <strong>MP4</strong> video and click <strong>Upload</strong></li>
//                 <li>Click a <strong>thumbnail</strong> in the timeline to select a time segment</li>
//                 <li>Pick a <strong>drawing tool</strong> from the left sidebar</li>
//                 <li>Draw on the video — annotations are <strong>auto-saved</strong></li>
//                 <li>Click <strong>Export</strong> to burn annotations into the video</li>
//               </ol>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }








import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import * as fabric from "fabric";

const API = "http://localhost:3000";

const COLORS = [
  "#ef4444","#f97316","#eab308","#22c55e",
  "#06b6d4","#3b82f6","#a855f7","#ec4899",
  "#ffffff","#111827",
];

const TOOLS = [
  { id: "select",    label: "Select",  icon: "↖" },
  { id: "rectangle", label: "Rect",    icon: "▭" },
  { id: "circle",    label: "Circle",  icon: "◯" },
  { id: "rambus",    label: "Rhombus", icon: "◇" },
  { id: "draw",      label: "Draw",    icon: "✏" },
  { id: "text",      label: "Text",    icon: "T" },
  { id: "eraser",    label: "Eraser",  icon: "⌫" },
];

const HIGHLIGHT_COLORS = [
  { value: "rgba(250,204,21,0.5)",  label: "Yellow" },
  { value: "rgba(34,197,94,0.5)",   label: "Green"  },
  { value: "rgba(239,68,68,0.5)",   label: "Red"    },
  { value: "rgba(59,130,246,0.5)",  label: "Blue"   },
  { value: "rgba(168,85,247,0.5)",  label: "Purple" },
];

function fmtTime(s) {
  if (!s && s !== 0) return "0:00";
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/* ── Small reusable button ── */
function Btn({ children, onClick, disabled, variant = "ghost", className = "", style: sx = {} }) {
  const base = {
    display: "inline-flex", alignItems: "center", gap: 6,
    borderRadius: 10, padding: "7px 14px", cursor: disabled ? "not-allowed" : "pointer",
    fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
    opacity: disabled ? 0.4 : 1, transition: "all 0.15s",
    border: "none", fontFamily: "inherit",
  };
  const variants = {
    primary: { background: "#f97316", color: "#fff", boxShadow: "0 1px 3px rgba(249,115,22,.35)" },
    green:   { background: "#16a34a", color: "#fff" },
    red:     { background: "#dc2626", color: "#fff" },
    ghost:   { background: "transparent", color: "#6b7280", border: "1px solid #e5e7eb" },
    outline: { background: "#fff", color: "#374151", border: "1px solid #e5e7eb", boxShadow: "0 1px 2px rgba(0,0,0,.04)" },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...base, ...variants[variant], ...sx }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = "brightness(0.92)"; }}
      onMouseLeave={e => { e.currentTarget.style.filter = ""; }}
    >{children}</button>
  );
}

/* ── Panel Card wrapper ── */
function Panel({ children, title, onClose, accent = false }) {
  return (
    <div style={{
      background: "#fff",
      border: `1px solid ${accent ? "#fed7aa" : "#e5e7eb"}`,
      borderRadius: 14,
      padding: 18,
      boxShadow: "0 1px 4px rgba(0,0,0,.06)",
    }}>
      {title && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>{title}</span>
          {onClose && (
            <button onClick={onClose} style={{
              background: "#f3f4f6", border: "none", borderRadius: 6,
              width: 26, height: 26, cursor: "pointer", color: "#6b7280",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
            }}>×</button>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

export default function Annotation() {
  /* ── refs ── */
  const fileInputRef    = useRef(null);
  const videoRef        = useRef(null);
  const canvasElRef     = useRef(null);
  const fabricRef       = useRef(null);
  const activeRangeRef  = useRef(null);
  const isDrawingRef    = useRef(false);
  const currentShapeRef = useRef(null);
  const renderedRef     = useRef(new Map());
  const containerRef    = useRef(null);

  /* ── state ── */
  const [videoFile,    setVideoFile]    = useState(null);
  const [videoUrl,     setVideoUrl]     = useState("");
  const [videoId,      setVideoId]      = useState(null);
  const [thumbnails,   setThumbnails]   = useState([]);
  const [annotations,  setAnnotations]  = useState([]);
  const [allNotes,     setAllNotes]     = useState([]);
  const [highlights,   setHighlights]   = useState([]);
  const [comments,     setComments]     = useState([]);

  const [tool,         setTool]         = useState("select");
  const [color,        setColor]        = useState("#ef4444");
  const [strokeWidth,  setStrokeWidth]  = useState(2);
  const [fillEnabled,  setFillEnabled]  = useState(false);

  const [isPlaying,    setIsPlaying]    = useState(false);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(0);

  const [activeSegment,      setActiveSegment]      = useState(null);
  const [showNotes,          setShowNotes]          = useState(false);
  const [noteContent,        setNoteContent]        = useState("");
  const [noteSaved,          setNoteSaved]          = useState(false);
  const [showHighlights,     setShowHighlights]     = useState(false);
  const [highlightColor,     setHighlightColor]     = useState(HIGHLIGHT_COLORS[0].value);
  const [highlightLabel,     setHighlightLabel]     = useState("");
  const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);
  const [showComments,       setShowComments]       = useState(false);
  const [pendingComment,     setPendingComment]     = useState(null);
  const [commentText,        setCommentText]        = useState("");

  const [uploading,  setUploading]  = useState(false);
  const [exporting,  setExporting]  = useState(false);
  const [uploadPct,  setUploadPct]  = useState(0);
  const [status,     setStatus]     = useState("");
  const [canvasReady, setCanvasReady] = useState(false);

  /* ── Init Fabric ── */
  useEffect(() => {
    const el = canvasElRef.current;
    if (!el) return;
    const canvas = new fabric.Canvas(el, {
      selection: false, preserveObjectStacking: true, enableRetinaScaling: false,
    });
    canvas.setDimensions({ width: 880, height: 495 });
    fabricRef.current = canvas;
    setCanvasReady(true);
    return () => { try { canvas.dispose(); } catch (_) {} };
  }, []);

  /* ── Sync canvas size ── */
  useEffect(() => {
    const video = videoRef.current, canvas = fabricRef.current;
    if (!video || !canvas) return;
    const sync = () => {
      const r = video.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        canvas.setDimensions({ width: r.width, height: r.height });
        canvas.calcOffset(); canvas.requestRenderAll();
      }
    };
    const ro = new ResizeObserver(sync);
    ro.observe(video);
    video.addEventListener("loadedmetadata", sync);
    video.addEventListener("loadeddata", sync);
    window.addEventListener("resize", sync);
    return () => {
      ro.disconnect();
      video.removeEventListener("loadedmetadata", sync);
      video.removeEventListener("loadeddata", sync);
      window.removeEventListener("resize", sync);
    };
  }, [canvasReady]);

  /* ── Load data after upload ── */
  useEffect(() => {
    if (!videoId) return;
    axios.get(`${API}/api/annotations/${videoId}`).then(r => setAnnotations(r.data?.annotations?.annotations || [])).catch(() => {});
    axios.get(`${API}/api/annotations/getAllNotes/${videoId}`).then(r => setAllNotes(r.data || [])).catch(() => {});
    axios.get(`${API}/api/highlights/${videoId}`).then(r => setHighlights(r.data || [])).catch(() => {});
    axios.get(`${API}/api/comments/${videoId}`).then(r => setComments(r.data || [])).catch(() => {});
  }, [videoId]);

  /* ── Drawing tools ── */
  useEffect(() => {
    const canvas = fabricRef.current;
    if (!canvas) return;
    canvas.isDrawingMode = false;
    canvas.selection = tool === "select";
    const wrapperEl = canvas.wrapperEl;
    if (wrapperEl) wrapperEl.style.pointerEvents = tool === "select" ? "none" : "auto";

    if (tool === "draw") {
      canvas.isDrawingMode = true;
      if (wrapperEl) wrapperEl.style.pointerEvents = "auto";
      const brush = new fabric.PencilBrush(canvas);
      brush.color = color; brush.width = strokeWidth;
      canvas.freeDrawingBrush = brush;
    }

    const getRange = () => {
      if (!activeRangeRef.current) { alert("Click a thumbnail below to select a time segment first."); return null; }
      return activeRangeRef.current;
    };

    const persistAnnotation = async (shape, range, toolName) => {
      const vw = canvas.getWidth(), vh = canvas.getHeight();
      const obj = shape.toObject ? shape.toObject() : {};
      const sx = obj.scaleX || 1, sy = obj.scaleY || 1;
      let paths = null;
      if (toolName === "draw") paths = obj.path || null;
      const payload = {
        type: toolName, startTime: range.start, endTime: range.end,
        position: { x: (obj.left || 0) / vw, y: (obj.top || 0) / vh },
        size: { width: ((obj.width || 1) * sx) / vw, height: ((obj.height || 1) * sy) / vh },
        rotation: obj.angle || 0, draggable: true, visible: true,
        data: {
          shapeType: toolName, strokeColor: obj.stroke || color,
          fillColor: obj.fill || "transparent", strokeWidth: obj.strokeWidth || strokeWidth,
          text: obj.text || null, fontSize: obj.fontSize || null, paths,
        },
      };
      try {
        const res = await axios.post(`${API}/api/annotations/create`, { videoId, annotations: [payload] });
        setAnnotations(res.data.annotations || []);
        setStatus("✓ Annotation saved");
        setTimeout(() => setStatus(""), 2000);
      } catch (e) { setStatus("❌ Save failed"); }
    };

    let startX = 0, startY = 0, drawing = false;

    const onDown = (opt) => {
      if (tool === "select" || tool === "draw") return;
      if (tool === "eraser") {
        const target = canvas.findTarget(opt.e);
        if (!target) return;
        const id = target.annotationId;
        canvas.remove(target); canvas.requestRenderAll();
        if (id) {
          renderedRef.current.delete(id);
          axios.delete(`${API}/api/annotations/${videoId}/${id}`).then(r => setAnnotations(r.data.annotations || [])).catch(() => {});
        }
        return;
      }
      const range = getRange(); if (!range) return;
      if (tool === "text") {
        const p = canvas.getViewportPoint(opt.e);
        videoRef.current?.pause();
        const txt = new fabric.IText("", { left: p.x, top: p.y, fill: color, fontSize: 20, selectable: true, editable: true });
        canvas.add(txt); canvas.setActiveObject(txt); txt.enterEditing(); txt.hiddenTextarea?.focus();
        isDrawingRef.current = true;
        txt.on("editing:exited", async () => {
          if (!txt.text.trim()) { canvas.remove(txt); isDrawingRef.current = false; return; }
          await persistAnnotation(txt, range, "text"); canvas.remove(txt); isDrawingRef.current = false;
        });
        return;
      }
      videoRef.current?.pause();
      isDrawingRef.current = true; drawing = true;
      const p = canvas.getViewportPoint(opt.e); startX = p.x; startY = p.y;
      const fill = fillEnabled ? color : "transparent";
      if (tool === "rectangle") currentShapeRef.current = new fabric.Rect({ left: startX, top: startY, width: 1, height: 1, fill, stroke: color, strokeWidth, selectable: false, evented: false });
      else if (tool === "circle") currentShapeRef.current = new fabric.Ellipse({ left: startX, top: startY, rx: 1, ry: 1, originX: "left", originY: "top", fill, stroke: color, strokeWidth, selectable: false, evented: false });
      else if (tool === "rambus") currentShapeRef.current = new fabric.Polygon([{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }], { left: startX, top: startY, fill, stroke: color, strokeWidth, selectable: false, evented: false });
      if (currentShapeRef.current) canvas.add(currentShapeRef.current);
    };

    const onMove = (opt) => {
      if (!drawing || !currentShapeRef.current) return;
      const p = canvas.getViewportPoint(opt.e);
      const w = p.x - startX, h = p.y - startY;
      const s = currentShapeRef.current;
      if (tool === "rectangle") s.set({ left: Math.min(p.x, startX), top: Math.min(p.y, startY), width: Math.abs(w), height: Math.abs(h) });
      else if (tool === "circle") s.set({ left: Math.min(p.x, startX), top: Math.min(p.y, startY), rx: Math.abs(w) / 2, ry: Math.abs(h) / 2 });
      else if (tool === "rambus") { const aw = Math.abs(w), ah = Math.abs(h); s.set({ left: Math.min(startX, p.x), top: Math.min(startY, p.y), points: [{ x: aw / 2, y: 0 }, { x: aw, y: ah / 2 }, { x: aw / 2, y: ah }, { x: 0, y: ah / 2 }] }); }
      canvas.requestRenderAll();
    };

    const onUp = async () => {
      if (!drawing) return; drawing = false; isDrawingRef.current = false;
      const s = currentShapeRef.current; currentShapeRef.current = null;
      if (!s) return; s.setCoords();
      const range = activeRangeRef.current; if (!range) { canvas.remove(s); return; }
      await persistAnnotation(s, range, tool); canvas.remove(s); canvas.requestRenderAll();
    };

    const onPath = async (opt) => {
      isDrawingRef.current = false;
      const range = activeRangeRef.current; if (!range) { canvas.remove(opt.path); return; }
      await persistAnnotation(opt.path, range, "draw"); canvas.remove(opt.path); canvas.requestRenderAll();
    };

    canvas.on("mouse:down", onDown); canvas.on("mouse:move", onMove);
    canvas.on("mouse:up", onUp); canvas.on("path:created", onPath);
    return () => {
      canvas.off("mouse:down", onDown); canvas.off("mouse:move", onMove);
      canvas.off("mouse:up", onUp); canvas.off("path:created", onPath);
    };
  }, [tool, color, strokeWidth, fillEnabled, videoId, canvasReady]);

  /* ── Render annotations ── */
  const renderAnnotation = useCallback((ann) => {
    const canvas = fabricRef.current; if (!canvas) return null;
    const vw = canvas.getWidth(), vh = canvas.getHeight();
    const { data: d, position: pos, size: sz } = ann;
    const x = pos.x * vw, y = pos.y * vh, w = sz.width * vw, h = sz.height * vh;
    const common = { left: x, top: y, fill: d.fillColor || "transparent", stroke: d.strokeColor || "#f97316", strokeWidth: d.strokeWidth || 2, selectable: false, evented: false, angle: ann.rotation || 0 };
    let shape = null;
    if      (d.shapeType === "rectangle") shape = new fabric.Rect({ ...common, width: w, height: h });
    else if (d.shapeType === "circle")    shape = new fabric.Ellipse({ ...common, rx: w / 2, ry: h / 2 });
    else if (d.shapeType === "rambus")    shape = new fabric.Polygon([{ x: w/2, y: 0 }, { x: w, y: h/2 }, { x: w/2, y: h }, { x: 0, y: h/2 }], { ...common });
    else if (d.shapeType === "draw" && d.paths) {
      let pathStr = Array.isArray(d.paths) ? d.paths.map(seg => seg.join(" ")).join(" ") : d.paths;
      shape = new fabric.Path(pathStr, { ...common, width: w, height: h });
    }
    else if (d.shapeType === "text" && d.text) shape = new fabric.IText(d.text, { ...common, fill: d.strokeColor, fontSize: d.fontSize || 20, editable: false });
    if (shape) { shape.annotationId = ann._id; canvas.add(shape); }
    return shape;
  }, []);

  /* ── Timeupdate ── */
  useEffect(() => {
    const video = videoRef.current, canvas = fabricRef.current;
    if (!video || !canvas) return;
    const onTime = () => {
      if (isDrawingRef.current) return;
      const t = video.currentTime; setCurrentTime(t);
      const remove = [];
      canvas.getObjects().forEach(obj => {
        if (!obj.annotationId && !obj.commentPin) return;
        if (obj.commentPin) { const c = comments.find(c => c._id === obj.commentPin); if (!c || t < c.startTime || t > c.endTime) remove.push(obj); return; }
        const ann = annotations.find(a => a._id === obj.annotationId);
        if (!ann || t < ann.startTime || t > ann.endTime) { remove.push(obj); renderedRef.current.delete(obj.annotationId); }
      });
      remove.forEach(o => canvas.remove(o));
      annotations.forEach(ann => { if (t >= ann.startTime && t <= ann.endTime && !renderedRef.current.has(ann._id)) { const s = renderAnnotation(ann); if (s) renderedRef.current.set(ann._id, s); } });
      comments.forEach(c => {
        const exists = canvas.getObjects().some(o => o.commentPin === c._id);
        if (t >= c.startTime && t <= c.endTime && !exists) {
          const pin = new fabric.IText("💬", { left: c.x, top: c.y, fontSize: 18, selectable: false, evented: false });
          pin.commentPin = c._id; canvas.add(pin);
        }
      });
      canvas.requestRenderAll();
    };
    video.addEventListener("timeupdate", onTime);
    return () => video.removeEventListener("timeupdate", onTime);
  }, [annotations, comments, renderAnnotation]);

  /* ── Upload ── */
  const handleUpload = async () => {
    if (!videoFile) { alert("Choose a video first."); return; }
    setUploading(true); setUploadPct(0);
    const form = new FormData(); form.append("video", videoFile);
    try {
      const res = await axios.post(`${API}/api/cloudinary/upload`, form, { onUploadProgress: e => setUploadPct(Math.round((e.loaded / e.total) * 100)) });
      setVideoUrl(res.data.video.url); setThumbnails(res.data.thumbnails || []);
      setVideoId(res.data.video._id); setDuration(res.data.video.duration || 0);
      setStatus("Video uploaded ✓"); setTimeout(() => setStatus(""), 3000);
    } catch { alert("Upload failed – is your server running?"); }
    setUploading(false);
  };

  /* ── Playback ── */
  const handlePlayPause = () => { const v = videoRef.current; if (!v) return; if (v.paused) { v.play(); setIsPlaying(true); } else { v.pause(); setIsPlaying(false); } };
  const handleStop = () => { const v = videoRef.current; if (!v) return; v.pause(); v.currentTime = 0; setIsPlaying(false); };
  const handleSeek = (e) => {
    if (isDraggingTimeline) return;
    const r = e.currentTarget.getBoundingClientRect();
    const t = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    if (videoRef.current) videoRef.current.currentTime = t * (videoRef.current.duration || 0);
  };

  /* ── Select segment ── */
  const selectSegment = (t) => {
    activeRangeRef.current = { start: t.start, end: t.end };
    setActiveSegment({ start: t.start, end: t.end });
    const canvas = fabricRef.current;
    renderedRef.current.forEach(obj => canvas?.remove(obj)); renderedRef.current.clear(); canvas?.requestRenderAll();
    if (videoRef.current) { videoRef.current.currentTime = t.start; videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {}); }
    if (videoId) { axios.get(`${API}/api/annotations/getNotes/${videoId}`, { params: { start: t.start, end: t.end } }).then(r => setNoteContent(r.data?.content || "")).catch(() => setNoteContent("")); }
  };

  /* ── Notes ── */
  const saveNote = async () => {
    if (!videoId || !activeRangeRef.current) { alert("Select a segment first."); return; }
    const { start, end } = activeRangeRef.current;
    await axios.post(`${API}/api/annotations/saveNotes`, { videoId, start, end, content: noteContent });
    setNoteSaved(true); setTimeout(() => setNoteSaved(false), 2000);
    const r = await axios.get(`${API}/api/annotations/getAllNotes/${videoId}`); setAllNotes(r.data || []);
  };

  /* ── Highlights ── */
  const addHighlight = async () => {
    if (!videoId || !activeRangeRef.current) { alert("Select a segment first."); return; }
    const { start, end } = activeRangeRef.current;
    try {
      const res = await axios.post(`${API}/api/highlights/${videoId}`, { start, end, color: highlightColor, label: highlightLabel });
      setHighlights(h => [...h, res.data]); setHighlightLabel(""); setStatus("✓ Highlight saved"); setTimeout(() => setStatus(""), 2000);
    } catch { setStatus("❌ Failed to save highlight"); }
  };

  const deleteHighlight = async (id) => {
    try { await axios.delete(`${API}/api/highlights/${videoId}/${id}`); setHighlights(h => h.filter(x => x._id !== id)); }
    catch { setStatus("❌ Failed to delete highlight"); }
  };

  /* ── Comments ── */
  const handleCanvasClickForComment = useCallback((e) => {
    if (tool !== "select" || !showComments || !activeRangeRef.current) return;
    const canvas = fabricRef.current; if (!canvas) return;
    const rect = canvasElRef.current?.getBoundingClientRect(); if (!rect) return;
    setPendingComment({ x: e.clientX - rect.left, y: e.clientY - rect.top }); setCommentText("");
  }, [tool, showComments]);

  const saveComment = async () => {
    if (!pendingComment || !videoId || !activeRangeRef.current || !commentText.trim()) return;
    const { start, end } = activeRangeRef.current;
    try {
      const res = await axios.post(`${API}/api/comments/${videoId}`, { x: pendingComment.x, y: pendingComment.y, text: commentText, startTime: start, endTime: end });
      setComments(c => [...c, res.data]); setPendingComment(null); setCommentText(""); setStatus("✓ Comment saved"); setTimeout(() => setStatus(""), 2000);
    } catch { setStatus("❌ Failed to save comment"); }
  };

  const deleteComment = async (id) => {
    try { await axios.delete(`${API}/api/comments/${id}`); setComments(c => c.filter(x => x._id !== id)); }
    catch { setStatus("❌ Failed to delete comment"); }
  };

  /* ── Export ── */
  const handleDownload = async () => {
    if (!videoId) { alert("Upload a video first."); return; }
    setExporting(true); setStatus("Rendering annotated video… this may take a minute.");
    try {
      const res = await fetch(`${API}/api/export/${videoId}`, { method: "POST" });
      if (!res.ok) throw new Error(await res.text());
      const blob = await res.blob(); const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "annotated-video.mp4"; a.click(); URL.revokeObjectURL(url);
      setStatus("Download started ✓");
    } catch (e) { setStatus("Export failed: " + e.message); }
    setExporting(false); setTimeout(() => setStatus(""), 5000);
  };

  const pct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const getCursor = () => { if (tool === "select") return showComments ? "crosshair" : "default"; if (tool === "eraser") return "cell"; return "crosshair"; };

  /* ────────────────────────────────────────────
     RENDER
  ──────────────────────────────────────────── */
  return (
    <div style={{
      display: "flex", flexDirection: "column", minHeight: "100vh",
      background: "#f9fafb", color: "#111827",
      fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", fontSize: 13,
    }}>

      {/* ══ TOP NAV ══ */}
      <nav style={{
        display: "flex", alignItems: "center", gap: 12,
        padding: "0 20px", height: 60,
        background: "#fff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
        flexWrap: "wrap", position: "sticky", top: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "#f97316",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 2px 8px rgba(249,115,22,.35)",
          }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>▶</span>
          </div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#111827", letterSpacing: "-0.02em" }}>
            AnnotateAI
          </span>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 24, background: "#e5e7eb" }} />

        {/* File controls */}
        <input ref={fileInputRef} type="file" accept="video/mp4,video/*" style={{ display: "none" }} onChange={e => setVideoFile(e.target.files[0])} />
        <Btn onClick={() => fileInputRef.current.click()} variant="outline">
          <span style={{ fontSize: 14 }}>📁</span>
          {videoFile ? videoFile.name.slice(0, 24) : "Choose Video"}
        </Btn>
        <Btn onClick={handleUpload} disabled={!videoFile || uploading} variant="primary">
          {uploading ? `Uploading ${uploadPct}%…` : "↑ Upload"}
        </Btn>

        {/* Status pill */}
        {status && (
          <div style={{
            padding: "5px 12px", borderRadius: 20,
            background: status.startsWith("✓") ? "#f0fdf4" : "#fef2f2",
            color: status.startsWith("✓") ? "#16a34a" : "#dc2626",
            border: `1px solid ${status.startsWith("✓") ? "#bbf7d0" : "#fecaca"}`,
            fontSize: 12, fontWeight: 600,
          }}>{status}</div>
        )}

        <div style={{ flex: 1 }} />

        <Btn onClick={handleDownload} disabled={!videoId || exporting} variant="primary"
          style={{ background: exporting ? "#9ca3af" : "#16a34a" }}>
          {exporting ? "Exporting…" : "⬇ Export Video"}
        </Btn>
      </nav>

      {/* ══ BODY ══ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── LEFT TOOLBAR ── */}
        <aside style={{
          width: 64, background: "#fff",
          borderRight: "1px solid #e5e7eb",
          display: "flex", flexDirection: "column",
          alignItems: "center", paddingTop: 12, gap: 4,
          boxShadow: "1px 0 0 #f3f4f6",
        }}>
          {/* Tool buttons */}
          {TOOLS.map(t => (
            <button key={t.id} onClick={() => setTool(t.id)} title={t.label}
              style={{
                width: 46, height: 46, border: "none", borderRadius: 10,
                cursor: "pointer", transition: "all 0.15s",
                background: tool === t.id ? "#fff7ed" : "transparent",
                color: tool === t.id ? "#f97316" : "#9ca3af",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 2,
                boxShadow: tool === t.id ? "0 0 0 1.5px #fed7aa inset" : "none",
              }}>
              <span style={{ fontSize: 16 }}>{t.icon}</span>
              <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.02em" }}>{t.label}</span>
            </button>
          ))}

          <div style={{ flex: 1 }} />

          {/* Color palette */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, paddingBottom: 14, paddingTop: 6 }}>
            <div style={{ width: 28, height: 1, background: "#e5e7eb", marginBottom: 4 }} />
            {COLORS.map(c => (
              <div key={c} onClick={() => setColor(c)} style={{
                width: 20, height: 20, borderRadius: "50%", cursor: "pointer",
                background: c, border: color === c ? "2.5px solid #f97316" : c === "#ffffff" ? "1.5px solid #d1d5db" : "2px solid transparent",
                transform: color === c ? "scale(1.18)" : "scale(1)",
                transition: "all 0.15s", boxSizing: "border-box",
              }} />
            ))}
            {/* Active color swatch */}
            <div style={{ width: 28, height: 1, background: "#e5e7eb", marginTop: 4 }} />
            <div style={{ width: 22, height: 22, borderRadius: 5, background: color, border: "2px solid #e5e7eb", marginTop: 2 }} />
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", padding: 16, gap: 14, overflowY: "auto" }}>

          {/* Options row */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap",
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: 12, padding: "10px 14px",
            boxShadow: "0 1px 3px rgba(0,0,0,.04)",
          }}>
            {/* Stroke width */}
            <span style={{ color: "#9ca3af", fontSize: 11, fontWeight: 600, marginRight: 2 }}>Stroke</span>
            {[1, 2, 4, 6].map(w => (
              <button key={w} onClick={() => setStrokeWidth(w)} style={{
                width: 28, height: 28, border: strokeWidth === w ? "none" : "1px solid #e5e7eb",
                borderRadius: 7, cursor: "pointer", fontSize: 11, fontWeight: 700,
                background: strokeWidth === w ? "#fff7ed" : "#fff",
                color: strokeWidth === w ? "#f97316" : "#6b7280",
                transition: "all 0.12s",
              }}>{w}</button>
            ))}

            <div style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 4px" }} />

            {/* Fill toggle */}
            <button onClick={() => setFillEnabled(f => !f)} style={{
              padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
              background: fillEnabled ? "#fff7ed" : "#fff",
              color: fillEnabled ? "#f97316" : "#6b7280",
              border: fillEnabled ? "1px solid #fed7aa" : "1px solid #e5e7eb",
              transition: "all 0.12s",
            }}>
              {fillEnabled ? "◼ Fill On" : "◻ Fill Off"}
            </button>

            <div style={{ width: 1, height: 20, background: "#e5e7eb", margin: "0 4px" }} />

            {/* Panel toggles */}
            {[
              { key: "notes", show: showNotes, setShow: () => { if (!activeRangeRef.current) { alert("Select a segment first."); return; } setShowNotes(n => !n); }, emoji: "📝", label: "Notes", activeColor: "#f97316", activeBg: "#fff7ed", activeBorder: "#fed7aa" },
              { key: "hl", show: showHighlights, setShow: () => { if (!activeRangeRef.current) { alert("Select a segment first."); return; } setShowHighlights(h => !h); }, emoji: "🟡", label: "Highlights", activeColor: "#d97706", activeBg: "#fffbeb", activeBorder: "#fde68a" },
              { key: "cm", show: showComments, setShow: () => { if (!activeRangeRef.current) { alert("Select a segment first."); return; } setShowComments(c => !c); }, emoji: "💬", label: "Comments", activeColor: "#16a34a", activeBg: "#f0fdf4", activeBorder: "#bbf7d0" },
            ].map(({ key, show, setShow, emoji, label, activeColor, activeBg, activeBorder }) => (
              <button key={key} onClick={setShow} style={{
                padding: "5px 12px", borderRadius: 8, cursor: "pointer", fontSize: 11, fontWeight: 600,
                background: show ? activeBg : "#fff",
                color: show ? activeColor : "#6b7280",
                border: show ? `1px solid ${activeBorder}` : "1px solid #e5e7eb",
                transition: "all 0.12s",
              }}>
                {emoji} {label}
              </button>
            ))}

            {/* Active segment badge */}
            {activeSegment && (
              <div style={{
                marginLeft: "auto", padding: "4px 12px", borderRadius: 20,
                background: "#fff7ed", border: "1px solid #fed7aa",
                color: "#c2410c", fontSize: 11, fontWeight: 700,
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
                {activeSegment.start.toFixed(1)}s – {activeSegment.end.toFixed(1)}s
              </div>
            )}
          </div>

          {/* ── VIDEO + CANVAS ── */}
          <div style={{
            borderRadius: 14, overflow: "hidden",
            boxShadow: "0 4px 16px rgba(0,0,0,.10)",
            border: "1px solid #e5e7eb",
            background: "#000",
            position: "relative",
            lineHeight: 0,
          }}
            ref={containerRef}
          >
            <video
              ref={videoRef} src={videoUrl}
              style={{ width: "100%", maxHeight: 520, display: "block", objectFit: "contain" }}
              onLoadedMetadata={e => setDuration(e.target.duration)}
              onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}
            />
            <div
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 10,
                pointerEvents: tool === "select" && !showComments ? "none" : "auto",
                cursor: getCursor(),
              }}
              onClick={handleCanvasClickForComment}
            >
              <canvas ref={canvasElRef} style={{ width: "100%", height: "100%" }} />
            </div>

            {/* Pending comment popup */}
            {pendingComment && (
              <div style={{
                position: "absolute",
                left: Math.min(pendingComment.x + 10, (containerRef.current?.offsetWidth || 600) - 230),
                top: Math.min(pendingComment.y + 10, (containerRef.current?.offsetHeight || 400) - 110),
                zIndex: 20,
                background: "#fff", border: "1px solid #e5e7eb",
                borderRadius: 12, padding: 12, width: 220,
                boxShadow: "0 8px 24px rgba(0,0,0,.15)",
              }}>
                <textarea autoFocus value={commentText} onChange={e => setCommentText(e.target.value)}
                  placeholder="Add a comment…"
                  style={{
                    width: "100%", minHeight: 64, background: "#f9fafb",
                    border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827",
                    padding: "8px 10px", fontSize: 12, resize: "none",
                    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                  }} />
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <Btn onClick={saveComment} variant="primary" style={{ fontSize: 11, padding: "5px 12px" }}>Save</Btn>
                  <Btn onClick={() => setPendingComment(null)} variant="ghost" style={{ fontSize: 11, padding: "5px 12px" }}>Cancel</Btn>
                </div>
              </div>
            )}
          </div>

          {/* ── SEEK BAR + TRANSPORT ── */}
          <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 16px", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
            {/* Timeline with highlight marks */}
            <div onClick={handleSeek} style={{
              height: 8, background: "#f3f4f6", borderRadius: 99,
              cursor: "pointer", position: "relative", userSelect: "none", marginBottom: 12,
            }}>
              {highlights.map(h => {
                const left = duration > 0 ? (h.start / duration) * 100 : 0;
                const width = duration > 0 ? ((h.end - h.start) / duration) * 100 : 0;
                return (
                  <div key={h._id} title={h.label || `${h.start.toFixed(1)}s – ${h.end.toFixed(1)}s`}
                    style={{ position: "absolute", top: 0, height: "100%", left: `${left}%`, width: `${width}%`, background: h.color, borderRadius: 99, pointerEvents: "none" }} />
                );
              })}
              {/* Played progress */}
              <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: `${pct}%`, background: "#f97316", borderRadius: 99, pointerEvents: "none" }} />
              {/* Playhead dot */}
              <div style={{
                position: "absolute", top: "50%", left: `${pct}%`,
                transform: "translate(-50%,-50%)", width: 16, height: 16,
                borderRadius: "50%", background: "#f97316",
                border: "2.5px solid #fff", boxShadow: "0 0 0 2px #f97316, 0 2px 6px rgba(249,115,22,.4)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Transport controls */}
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={handlePlayPause} style={{
                width: 38, height: 38, borderRadius: 10, border: "none",
                background: "#f97316", color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, boxShadow: "0 2px 8px rgba(249,115,22,.3)",
                transition: "all 0.15s",
              }}>
                {isPlaying ? "⏸" : "▶"}
              </button>
              <button onClick={handleStop} style={{
                width: 38, height: 38, borderRadius: 10, border: "1px solid #e5e7eb",
                background: "#fff", color: "#6b7280", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
              }}>⏹</button>
              <span style={{ color: "#6b7280", fontSize: 12, fontWeight: 600, fontVariantNumeric: "tabular-nums", marginLeft: 4 }}>
                {fmtTime(currentTime)} / {fmtTime(duration)}
              </span>
            </div>
          </div>

          {/* ── TIMELINE THUMBNAILS ── */}
          {thumbnails.length > 0 && (
            <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "12px 14px", boxShadow: "0 1px 3px rgba(0,0,0,.04)" }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Timeline — click a segment to annotate
              </p>
              <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, scrollbarWidth: "thin", scrollbarColor: "#e5e7eb transparent" }}>
                {thumbnails.map(t => {
                  const active = activeSegment?.start === t.start;
                  const hasNote = allNotes.some(n => n.start === t.start && n.end === t.end);
                  const hasHighlight = highlights.some(h => h.start === t.start && h.end === t.end);
                  return (
                    <div key={t.start} onClick={() => selectSegment(t)} style={{ flexShrink: 0, cursor: "pointer", position: "relative", userSelect: "none" }}>
                      <div style={{
                        borderRadius: 8, overflow: "hidden",
                        border: active ? "2px solid #f97316" : "2px solid transparent",
                        boxShadow: active ? "0 0 0 3px rgba(249,115,22,.2)" : "none",
                        transition: "all 0.15s",
                      }}>
                        <img src={t.url} alt={`${t.start}s`} style={{ width: 88, height: 55, objectFit: "cover", display: "block", opacity: active ? 1 : 0.7, transition: "opacity 0.15s" }} />
                      </div>
                      <div style={{ fontSize: 9, textAlign: "center", marginTop: 3, color: active ? "#f97316" : "#9ca3af", fontWeight: active ? 700 : 400 }}>
                        {t.start.toFixed(1)}s
                      </div>
                      {hasNote && <div title="Has note" style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: "#f97316", border: "1.5px solid #fff" }} />}
                      {hasHighlight && <div title="Highlighted" style={{ position: "absolute", top: 4, left: 4, width: 8, height: 8, borderRadius: "50%", background: "#eab308", border: "1.5px solid #fff" }} />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── NOTES PANEL ── */}
          {showNotes && activeSegment && (
            <Panel
              title={`📝 Notes — ${activeSegment.start.toFixed(1)}s to ${activeSegment.end.toFixed(1)}s`}
              onClose={() => setShowNotes(false)}
              accent
            >
              <textarea value={noteContent} onChange={e => setNoteContent(e.target.value)}
                placeholder="Write notes for this segment…"
                style={{
                  width: "100%", minHeight: 90, background: "#f9fafb",
                  border: "1px solid #e5e7eb", borderRadius: 8, color: "#111827",
                  padding: "10px 12px", fontSize: 13, resize: "vertical",
                  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={e => { e.target.style.borderColor = "#f97316"; e.target.style.boxShadow = "0 0 0 3px rgba(249,115,22,.1)"; }}
                onBlur={e => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <Btn onClick={saveNote} variant="primary">{noteSaved ? "✓ Saved!" : "Save Note"}</Btn>
                <Btn onClick={() => setShowNotes(false)} variant="ghost">Close</Btn>
              </div>
            </Panel>
          )}

          {/* ── HIGHLIGHTS PANEL ── */}
          {showHighlights && activeSegment && (
            <Panel
              title={`🟡 Highlight — ${activeSegment.start.toFixed(1)}s to ${activeSegment.end.toFixed(1)}s`}
              onClose={() => setShowHighlights(false)}
            >
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 10 }}>Choose a highlight color:</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                {HIGHLIGHT_COLORS.map(hc => (
                  <div key={hc.value} onClick={() => setHighlightColor(hc.value)} title={hc.label}
                    style={{
                      width: 28, height: 28, borderRadius: 8, cursor: "pointer",
                      background: hc.value,
                      border: highlightColor === hc.value ? "2.5px solid #111827" : "2px solid transparent",
                      transform: highlightColor === hc.value ? "scale(1.15)" : "scale(1)",
                      transition: "all 0.12s",
                    }} />
                ))}
              </div>
              <input value={highlightLabel} onChange={e => setHighlightLabel(e.target.value)}
                placeholder="Label (optional)"
                style={{
                  width: "100%", background: "#f9fafb", border: "1px solid #e5e7eb",
                  borderRadius: 8, color: "#111827", padding: "8px 12px",
                  fontSize: 12, outline: "none", fontFamily: "inherit", boxSizing: "border-box", marginBottom: 12,
                }} />
              <Btn onClick={addHighlight} variant="primary">Add Highlight</Btn>

              {highlights.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Saved highlights</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {highlights.map(h => (
                      <div key={h._id} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        background: "#f9fafb", borderRadius: 8, padding: "8px 12px",
                        border: "1px solid #f3f4f6",
                      }}>
                        <div style={{ width: 14, height: 14, borderRadius: 4, background: h.color, flexShrink: 0, border: "1px solid rgba(0,0,0,.08)" }} />
                        <span style={{ flex: 1, fontSize: 12, color: "#374151" }}>
                          {h.start.toFixed(1)}s – {h.end.toFixed(1)}s{h.label ? ` · ${h.label}` : ""}
                        </span>
                        <button onClick={() => deleteHighlight(h._id)} style={{
                          background: "none", border: "none", color: "#dc2626",
                          cursor: "pointer", fontSize: 14, padding: "0 2px",
                        }}>✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Panel>
          )}

          {/* ── COMMENTS PANEL ── */}
          {showComments && (
            <Panel title="💬 Comments" onClose={() => setShowComments(false)}>
              {activeSegment && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "8px 12px", marginBottom: 14 }}>
                  <span style={{ fontSize: 12 }}>🖱️</span>
                  <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>Click anywhere on the video to pin a comment</span>
                </div>
              )}
              {comments.length === 0 ? (
                <div style={{ textAlign: "center", color: "#9ca3af", padding: "20px 0", fontSize: 12 }}>No comments yet. Click on the video to add one.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {comments.map(c => (
                    <div key={c._id} style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      background: "#f9fafb", borderRadius: 8, padding: "10px 12px",
                      border: "1px solid #f3f4f6",
                    }}>
                      <span style={{ fontSize: 16 }}>💬</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 3, fontWeight: 600 }}>
                          {c.startTime.toFixed(1)}s – {c.endTime.toFixed(1)}s
                        </div>
                        <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.5 }}>{c.text}</div>
                      </div>
                      <button onClick={() => deleteComment(c._id)} style={{ background: "none", border: "none", color: "#dc2626", cursor: "pointer", fontSize: 13 }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </Panel>
          )}

          {/* ── EMPTY STATE ── */}
          {!videoUrl && (
            <div style={{
              textAlign: "center", color: "#9ca3af",
              padding: "48px 20px",
              border: "2px dashed #e5e7eb",
              borderRadius: 16, background: "#fff",
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: 20, background: "#fff7ed",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 18px", fontSize: 32,
                boxShadow: "0 4px 12px rgba(249,115,22,.15)",
              }}>🎬</div>
              <p style={{ fontWeight: 800, fontSize: 18, marginBottom: 6, color: "#111827", letterSpacing: "-0.02em" }}>
                Welcome to AnnotateAI
              </p>
              <p style={{ color: "#6b7280", fontSize: 13, marginBottom: 20 }}>Upload a video to start annotating</p>
              <div style={{ display: "inline-block", textAlign: "left" }}>
                {[
                  { n: "1", text: <>Choose an <strong>MP4</strong> video and click <strong style={{ color: "#f97316" }}>Upload</strong></> },
                  { n: "2", text: "Click a thumbnail in the timeline to select a time segment" },
                  { n: "3", text: "Pick a drawing tool from the left sidebar and annotate" },
                  { n: "4", text: <>Use <strong>🟡 Highlights</strong> to mark important timeline segments</> },
                  { n: "5", text: <>Use <strong>💬 Comments</strong> to pin notes to canvas positions</> },
                  { n: "6", text: <>Click <strong style={{ color: "#16a34a" }}>⬇ Export Video</strong> to burn annotations in</> },
                ].map(({ n, text }) => (
                  <div key={n} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                    <div style={{ width: 22, height: 22, borderRadius: 8, background: "#f97316", color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{n}</div>
                    <span style={{ fontSize: 13, color: "#374151", lineHeight: "22px" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}