import mongoose from "mongoose";

export interface ISale{
    product: mongoose.Types.ObjectId;
    discountRate: number;
    saleIndex: number;
}

export interface ISaleOutputDTO{
    saleIndex: number;
    product: mongoose.Types.ObjectId;
    discountRate: number;
    discountedPrice: number;
}

export interface ITimeSaleOutputDTO{
    saleIndex: number;
    product: mongoose.Types.ObjectId;
    time: string;
    discountRate: number;
    discountedPrice: number;
}