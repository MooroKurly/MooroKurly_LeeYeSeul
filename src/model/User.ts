import mongoose from "mongoose";
import { IUser } from "../interface/IUser";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  phone:{
      type: String,
      required: true
  },
  address: {
    type: String,
    required: true,
  },
  birthday:{
      type: Date,
      required: false
  },
  gender:{
      type: String,
      required: false
  },
  date: {
      type: Date,
      default: Date.now
  }
});

export default mongoose.model<IUser & mongoose.Document>("User", UserSchema);