import mongoose from "mongoose";
const pschema = mongoose.Schema({
    name:String,
    Image:String,
    price:Number
});
export const products = mongoose.model('products', pschema);