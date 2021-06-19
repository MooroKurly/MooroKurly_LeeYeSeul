import mongoose from "mongoose";

export interface ISpecialSale{
    product: mongoose.Types.ObjectId;
    title: string,
    subtitle: string
}