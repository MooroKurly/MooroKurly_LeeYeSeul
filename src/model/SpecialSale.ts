import mongoose from "mongoose";
import { ISpecialSale } from "../interface/ISpecialSale";

const SpecialSaleSchema = new mongoose.Schema({
  product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product"
  },
  title: {
      type: String,
      required: true
  },
  subtitle:{
      type: String,
      required: true
  }

});

export default mongoose.model<ISpecialSale & mongoose.Document>("SpecialSale", SpecialSaleSchema);