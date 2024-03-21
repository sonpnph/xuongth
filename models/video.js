
import mongoose, { Schema } from "mongoose";
const videoSchema = new Schema({
    title:String,
    author:String,
    url: String,
    duration:Number
},
{
    timestamps:true
}
);
const VideoModel = mongoose.model('videos',videoSchema)
export default VideoModel;