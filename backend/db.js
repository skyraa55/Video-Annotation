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

const annotationSchema = new mongoose.Schema({
    
    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"video",
        required:true
    },
    annotations :[
        {
            _id:false,
            type:{
                type:String,
                enum:["shape","draw","text","emoji","comment","note","highlight"],
                required:true
            },
            startTime:{
                type:Number,
                required:true
            },
            endTime:{
                type:Number,
            },
            position:{
                x:Number,
                y:Number
            },
            size:{
                width:Number,
                height:Number
            },
            rotation:{
                type:Number,
                default:0
            },
            data:{
                paths:[
                    {
                        points:[{x:Number,y:Number}],
                        color:String,
                        strokeWidth:Number,
                        opacity:Number

                    }
                ],
                // shapes
                shapeType:{type:String,enum:["rectangle","circle","arrow","line","square"]},
                strokeColor:String,
                fillColor:String,
                strokeWidth:Number,
                // text and emoji
                text:String,
                fontSize:Number,
                fontFamily:String,
                textColor:String,
                backgroundColor:String,
                emoji:String,
                // comments
                comment:{
                    text:String,
                    replies:[
                        {
                            userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
                            text:String,
                            createdAt:{type:Date,default:Date.now}

                        }
                    ]
                },
                // notes
                notes:{
                    pages:[
                        {
                            title:String,
                            content:String,
                            textColor:String,
                            backgroundColor:String,
                            image:[
                                {
                                    url:String,
                                    width:Number,
                                    height:Number
                                }
                            ]

                        }
                    ]
                },
                // highlightcolor 
                highlightColor:{type:String},
        },
        draggable:{
            type:Boolean,
            default:true
        },
        visible:{
            type:Boolean,
            default:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }




        }
    ]

})

export const userModel = new mongoose.model("user",userSchema);
export const annotationModel = new mongoose.model("annotation",annotationSchema);
export const videoModel = new mongoose.model("video",videoSchema);

