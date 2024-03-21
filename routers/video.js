import  express from "express";
import VideoModel from "../models/video.js";
import Joi from "joi";
// tao Joi obj
const VideoJoiObject = Joi.object({
    title: Joi.string().required().min(10).empty().messages({
        "any.required":"ten vd khong de trong",
        "any.required":"ten vd khong de trong",
        "string.min":"ten vd khong nho hon 10 kt"
    }),
    author: Joi.string().required().empty().messages({
        "any.required":"ten tac gia khong de trong",
        "string.empty":"ten tac gia de trong",
    }),
    url: Joi.string().required().min(10).messages({
        "any.required":"url khong de trong",
        "string.empty":"url khong duoc de trong",
    }),
    duration: Joi.number().required().min(10).messages({
        "any.required":"thoi gian khong de trong",
        "number.empty":"thoi gian khong de trong",
        "number.min":"thoi gian qua ngan"
    })
})
const videorouter = express.Router();
videorouter.post('/videos',(req,res,next)=>{
    const body = req.body;
    const {error}  = VideoJoiObject.validate({
        title:body.title,
        author:body.title,
        url:body.url,
        duration:body.duration
    })
    if(error){
        res.send(error.message);
    }
    else{
        next();
    }
}, async (req,res)=>{
    try{
    const body = req.body;
    const video = new VideoModel(body);
    const response = await video.save()  
    res.send(response)  
    }catch(error){
        res.send(error)
    }
    
})
export default videorouter;