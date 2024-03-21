import mongoose from "mongoose";
const BooksSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            default: 0,
          },
          description: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          author: {
            type: String,
            required: true,
          },
    
    },
    {
        timestamps:true,
    }
);
export  const BookModel = mongoose.model("Books",BooksSchema);
