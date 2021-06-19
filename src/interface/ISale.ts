import mongoose from "mongoose";

export interface ISale{
    product: mongoose.Types.ObjectId;
    discountRate: number;
    saleIdx: number;
}

export interface ISaleOutputDTO{
    saleIdx: number;
    product: mongoose.Types.ObjectId;
    discountRate: number;
    discountedPrice: number;
}