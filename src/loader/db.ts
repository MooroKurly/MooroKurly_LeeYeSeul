import mongoose from "mongoose";
import config from "../config";
import Banner from "../model/Banner";
import Sale from "../model/Sale";
import Product from "../model/Product";
import SpecialSale from "../model/SpecialSale";
import User from "../model/User";

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Connected ...");

    Banner.createCollection().then(function(collection){
      console.log("Banner Collection is created!");
    });
    Sale.createCollection().then(function(collection){
      console.log("Sale Collection is created!");
    });
    Product.createCollection().then(function(collection){
      console.log("Product Collection is created!");
    });
    SpecialSale.createCollection().then(function(collection){
      console.log("SpecialSale Collection is created!");
    });
    User.createCollection().then(function(collection){
      console.log("User Collection is created!");
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
