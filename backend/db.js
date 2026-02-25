import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = process.env.MONGO_URL ;
mongoose.connect(MONGO_URL);
const userSchema =new mongoose.Schema({
    email : {type:String ,required:true,unique:true},
    password : {type:String,required:true},
    
},{timestamps:true});

const videoSchema = new mongoose.Schema({
    url:{type:String},
    publicId:{type:String},
    format:{type:String},
    duration:{type:Number},
    size:{type:Number},
    // uploadedBy : {type:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    

},{ timestamps:true });

const notesSchema = new mongoose.Schema({
  videoId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"video",
    required:true
  },
  startTime : Number,
  endTime : Number,
  content : {
    type:String,
    default:""
  },

},{ timestamps:true});

const annotationSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video",
    required: true,
    unique: true
  },

  annotations: [
    {
      type: {
        type: String,
        enum: [
          "rectangle",
          "circle",
          "rambus",
          "text",
          "draw",
          "notes"
        ],
        required: true
      },

      startTime: {
        type: Number,
        required: true
      },

      endTime: {
        type: Number,
        required: true
      },

      position: {
        x: Number,
        y: Number
      },

      size: {
        width: Number,
        height: Number
      },

      rotation: {
        type: Number,
        default: 0
      },

      data: {
        shapeType: {
          type: String,
          enum: [
            "rectangle",
            "circle",
            "rambus",
            "text",
            "draw",
            "notes"
          ]
        },

        strokeColor: String,
        fillColor: String,
        strokeWidth: Number,
        text: String,
        fontSize: Number,
        imageUrl: String,
        paths: mongoose.Schema.Types.Mixed
      },

      draggable: {
        type: Boolean,
        default: true
      },

      visible: {
        type: Boolean,
        default: true
      },

      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

export const userModel = new mongoose.model("user",userSchema);
export const annotationModel = new mongoose.model("annotation",annotationSchema);
export const videoModel = new mongoose.model("video",videoSchema);
export const notesModel = new mongoose.model("notes",notesSchema);



