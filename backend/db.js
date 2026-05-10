// import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config();
// const MONGO_URL = process.env.MONGO_URL ;
// mongoose.connect(MONGO_URL);
// const userSchema =new mongoose.Schema({
//     email : {type:String ,required:true,unique:true},
//     password : {type:String,required:true},
    
// },{timestamps:true});

// const videoSchema = new mongoose.Schema({
//     url:{type:String},
//     publicId:{type:String},
//     format:{type:String},
//     duration:{type:Number},
//     size:{type:Number},
//     // uploadedBy : {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    

// },{ timestamps:true });

// const notesSchema = new mongoose.Schema({
//   videoId:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"video",
//     required:true
//   },
//   start : Number,
//   end : Number,
//   content : {
//     type:String,
//     default:""
//   },

// },{ timestamps:true});

// const annotationSchema = new mongoose.Schema({
//   videoId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "video",
//     required: true,
//     unique: true
//   },

//   annotations: [
//     {
//       type: {
//         type: String,
//         enum: [
//           "rectangle",
//           "circle",
//           "rambus",
//           "text",
//           "draw",
//           "notes"
//         ],
//         required: true
//       },

//       startTime: {
//         type: Number,
//         required: true
//       },

//       endTime: {
//         type: Number,
//         required: true
//       },

//       position: {
//         x: Number,
//         y: Number
//       },

//       size: {
//         width: Number,
//         height: Number
//       },

//       rotation: {
//         type: Number,
//         default: 0
//       },

//       data: {
//         shapeType: {
//           type: String,
//           enum: [
//             "rectangle",
//             "circle",
//             "rambus",
//             "text",
//             "draw",
//             "notes"
//           ]
//         },

//         strokeColor: String,
//         fillColor: String,
//         strokeWidth: Number,
//         text: String,
//         fontSize: Number,
//         imageUrl: String,
//         paths: mongoose.Schema.Types.Mixed
//       },

//       draggable: {
//         type: Boolean,
//         default: true
//       },

//       visible: {
//         type: Boolean,
//         default: true
//       },

//       createdAt: {
//         type: Date,
//         default: Date.now
//       }
//     }
//   ]
// });

// export const userModel = new mongoose.model("user",userSchema);
// export const annotationModel = new mongoose.model("annotation",annotationSchema);
// export const videoModel = new mongoose.model("video",videoSchema);
// export const notesModel = new mongoose.model("notes",notesSchema);




// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

// mongoose.connect(process.env.MONGO_URL);

// // ── User ──────────────────────────────────────────────────────────────────────
// const userSchema = new mongoose.Schema({
//   email:    { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { timestamps: true });

// // ── Video ─────────────────────────────────────────────────────────────────────
// const videoSchema = new mongoose.Schema({
//   url:      { type: String },
//   publicId: { type: String },
//   format:   { type: String },
//   duration: { type: Number },
//   size:     { type: Number },
// }, { timestamps: true });

// // ── Notes ─────────────────────────────────────────────────────────────────────
// const notesSchema = new mongoose.Schema({
//   videoId: { type: mongoose.Schema.Types.ObjectId, ref: "video", required: true },
//   start:   { type: Number, required: true },
//   end:     { type: Number, required: true },
//   content: { type: String, default: "" },
// }, { timestamps: true });

// // ── Highlights ────────────────────────────────────────────────────────────────
// const highlightSchema = new mongoose.Schema({
//   videoId: { type: mongoose.Schema.Types.ObjectId, ref: "video", required: true },
//   start:   { type: Number, required: true },
//   end:     { type: Number, required: true },
//   color:   { type: String, default: "rgba(250,204,21,0.35)" },
//   label:   { type: String, default: "" },
// }, { timestamps: true });

// // ── Comments (pinned to canvas position) ─────────────────────────────────────
// const commentSchema = new mongoose.Schema({
//   videoId:   { type: mongoose.Schema.Types.ObjectId, ref: "video", required: true },
//   x:         { type: Number, required: true },   // canvas px
//   y:         { type: Number, required: true },
//   text:      { type: String, required: true },
//   startTime: { type: Number, required: true },
//   endTime:   { type: Number, required: true },
// }, { timestamps: true });

// // ── Annotations ───────────────────────────────────────────────────────────────
// const annotationSchema = new mongoose.Schema({
//   videoId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "video",
//     required: true,
//     unique: true,
//   },
//   annotations: [
//     {
//       type: {
//         type: String,
//         enum: ["rectangle", "circle", "rambus", "text", "draw"],
//         required: true,
//       },
//       startTime: { type: Number, required: true },
//       endTime:   { type: Number, required: true },
//       position:  { x: Number, y: Number },
//       size:      { width: Number, height: Number },
//       rotation:  { type: Number, default: 0 },
//       data: {
//         shapeType:   { type: String },
//         strokeColor: String,
//         fillColor:   String,
//         strokeWidth: Number,
//         text:        String,
//         fontSize:    Number,
//         imageUrl:    String,
//         paths:       mongoose.Schema.Types.Mixed,
//       },
//       draggable: { type: Boolean, default: true },
//       visible:   { type: Boolean, default: true },
//       createdAt: { type: Date, default: Date.now },
//     },
//   ],
// });

// export const userModel      = mongoose.model("user",       userSchema);
// export const videoModel     = mongoose.model("video",      videoSchema);
// export const notesModel     = mongoose.model("notes",      notesSchema);
// export const highlightModel = mongoose.model("highlight",  highlightSchema);
// export const commentModel   = mongoose.model("comment",    commentSchema);
// export const annotationModel = mongoose.model("annotation", annotationSchema);








import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL);

// ── User ──────────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// ── Video ─────────────────────────────────────────────────────────────────────
const videoSchema = new mongoose.Schema({
  url:      { type: String },
  publicId: { type: String },
  format:   { type: String },
  duration: { type: Number },
  size:     { type: Number },
}, { timestamps: true });

// ── Notes ─────────────────────────────────────────────────────────────────────
const notesSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "video", required: true },
  start:   { type: Number, required: true },
  end:     { type: Number, required: true },
  content: { type: String, default: "" },
}, { timestamps: true });

// ── Highlights ────────────────────────────────────────────────────────────────
const highlightSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "video", required: true },
  start:   { type: Number, required: true },
  end:     { type: Number, required: true },
  color:   { type: String, default: "rgba(250,204,21,0.35)" },
  label:   { type: String, default: "" },
}, { timestamps: true });

// ── Comments (pinned to canvas position) ─────────────────────────────────────
const commentSchema = new mongoose.Schema({
  videoId:   { type: mongoose.Schema.Types.ObjectId, ref: "video", required: true },
  x:         { type: Number, required: true },   // canvas px
  y:         { type: Number, required: true },
  text:      { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime:   { type: Number, required: true },
}, { timestamps: true });

// ── Annotations ───────────────────────────────────────────────────────────────
const annotationSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video",
    required: true,
    unique: true,
  },
  annotations: [
    {
      type: {
        type: String,
        enum: ["rectangle", "circle", "rambus", "text", "draw"],
        required: true,
      },
      startTime: { type: Number, required: true },
      endTime:   { type: Number, required: true },
      position:  { x: Number, y: Number },
      size:      { width: Number, height: Number },
      rotation:  { type: Number, default: 0 },
      data: {
        shapeType:   { type: String },
        strokeColor: String,
        fillColor:   String,
        strokeWidth: Number,
        text:        String,
        fontSize:    Number,
        imageUrl:    String,
        paths:       mongoose.Schema.Types.Mixed,
      },
      draggable: { type: Boolean, default: true },
      visible:   { type: Boolean, default: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
});
const detailedNoteSchema = new mongoose.Schema(
  {
    heading: { type: String, required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);
 
const notesDataSchema = new mongoose.Schema(
  {
    title: { type: String },
    summary: { type: String },
    keyPoints: [{ type: String }],
    detailedNotes: [detailedNoteSchema],
    actionItems: [{ type: String }],
    tags: [{ type: String }],
  },
  { _id: false }
);
 
const aiNotesSchema = new mongoose.Schema(
  {
    videoTitle: {
      type: String,
      required: true,
      trim: true,
    },
    videoFileName: {
      type: String,
      required: true,
    },
    videoPath: {
      type: String,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    transcript: {
      type: String,
    },
    notes: {
      type: notesDataSchema,
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

aiNotesSchema.index({ createdAt: -1 });
aiNotesSchema.index({ videoTitle: "text", "notes.tags": "text" });
export const userModel      = mongoose.model("user",       userSchema);
export const videoModel     = mongoose.model("video",      videoSchema);
export const notesModel     = mongoose.model("notes",      notesSchema);
export const highlightModel = mongoose.model("highlight",  highlightSchema);
export const commentModel   = mongoose.model("comment",    commentSchema);
export const annotationModel = mongoose.model("annotation", annotationSchema);
export const AINotes = mongoose.model("ainotes",aiNotesSchema);
