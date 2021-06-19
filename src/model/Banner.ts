import mongoose from "mongoose";
import { IBanner } from "../interface/IBanner";

const BannerSchema = new mongoose.Schema({
  img:{
      type: String,
      required: true
  }
});

export default mongoose.model<IBanner & mongoose.Document>("Banner", BannerSchema);