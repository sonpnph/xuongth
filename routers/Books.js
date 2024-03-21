import express from "express";
import { BookModel } from "../models/Books.js";
import joi from "joi";

const CheckValidate = joi.object({
  name: joi.string().required().empty().messages({
    "any.required": "Name is required",
    "string.empty": "Name is required",
  }),

  price: joi.number().required().empty().min(500).messages({
    "any.required": "Gia is required",
    "number.enty": "Gia khong de trong",
    "number.min": "Gia san pham phai lon hon 500",
  }),
  description: joi.string().required().empty().messages({
    "any.required": "description is required",
    "string.empty": "description is required",
  }),
  image: joi.string().required().empty().messages({
    "any.required": "Price is required",
    "string.empty": "Price is required",
  }),
  author: joi.string().required().empty().messages({
    "any.required": "Author is required",
    "string.empty": "Author is required",
  }),
});
const bookrouter = express.Router();

bookrouter.post("/books", async (req, res) => {
  const { name, price, description, image, author } = req.body;
  const { error } = CheckValidate.validate({
    name,
    price,
    description,
    image,
    author,
  });
  if (error) {
    console.log(error.message);
    res.send({ status: false, message: error.message });
  } else {
    const book = await new BookModel(req.body).save();
    res.send({ status: true, data: book });
  }
});
bookrouter.get("/books", async (req, res) => {
  const response = await BookModel.find();
  res.send(response);
});
bookrouter.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const response = await BookModel.findOneAndUpdate({ _id: id }, body, {
    new: true,
  });
  res.send(response);
});
bookrouter.delete("/books/:id", async (req, res) => {
  const id = req.params.id;
  const response = await BookModel.findOneAndDelete({ _id: id });
  res.send(response);
});
export default bookrouter;
