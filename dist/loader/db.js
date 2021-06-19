"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config"));
const Banner_1 = __importDefault(require("../model/Banner"));
const Sale_1 = __importDefault(require("../model/Sale"));
const Product_1 = __importDefault(require("../model/Product"));
const SpecialSale_1 = __importDefault(require("../model/SpecialSale"));
const User_1 = __importDefault(require("../model/User"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.default.mongoURI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log("Mongoose Connected ...");
        Banner_1.default.createCollection().then(function (collection) {
            console.log("Banner Collection is created!");
        });
        Sale_1.default.createCollection().then(function (collection) {
            console.log("Sale Collection is created!");
        });
        Product_1.default.createCollection().then(function (collection) {
            console.log("Product Collection is created!");
        });
        SpecialSale_1.default.createCollection().then(function (collection) {
            console.log("SpecialSale Collection is created!");
        });
        User_1.default.createCollection().then(function (collection) {
            console.log("User Collection is created!");
        });
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
});
exports.default = connectDB;
//# sourceMappingURL=db.js.map