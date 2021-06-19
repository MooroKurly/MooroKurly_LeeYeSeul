import mongoose from "mongoose";
import { IProduct } from "../interface/IProduct";

const ProductSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  name:{
      type: String,
      required: true
  },
  price:{
      type: Number,
      required: true
  }
});

export default mongoose.model<IProduct & mongoose.Document>("Product", ProductSchema);