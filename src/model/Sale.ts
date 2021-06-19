import mongoose from "mongoose";
import { ISale } from "../interface/ISale";

const SaleSchema = new mongoose.Schema({
  product: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Product"
  },
  discountRate:{
      type: Number,
      required: true
  },
  saleIdx:{
      type: Number,
      requied: true
  }

});

export default mongoose.model<ISale & mongoose.Document>("Recommend", SaleSchema);