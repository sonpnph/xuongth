import express, { json, raw } from 'express';
import { products } from '../models/product.js';
import Joi from 'joi';

const CheckValidate = Joi.object({
    name: Joi.string().required().empty().messages({
        "any.requited":"Ten khong duoc de chong",
        "string.empty":"Ten khong dung dinh dang"
    }),
    image: Joi.string().required().empty().messages({
        "any.requited":"Ten khong duoc de chong",
        "string.empty":"Anh khong dung dinh dang"
    }),
    price: Joi.number().required().min(1000).messages({
        "any.requited":"Ten khong duoc de chong",
        "number.min":"Gia sp khong nho hon 1000"
    })
})
const router = express.Router();
router.post('/banhang',async (req ,res)=>{
    const {name,image,price} = req.body;
    const {error} = CheckValidate.validate({name,image,price})
    if(error){
        console.log(error.message);
        res.send({status:false,message:error.message});
    }else{
        const product = await new products(req.body).save();
    res.send({status:true,data:product});
    }
})
router.get('/banhang',async (req ,res)=>{
    const response= await products.find();
    res.send(response);
})
router.put('/banhang/:id',async (req ,res)=>{
    const id = req.params.id;
    const body = req.body;
    const response= await products.findOneAndUpdate({_id:id},body,{new:true});
    res.send(response);
})
router.delete('/banhang/:id',async (req ,res)=>{
    const id = req.params.id;
    const response= await products.findOneAndDelete({_id:id});
    res.send(response);
})
export default router;