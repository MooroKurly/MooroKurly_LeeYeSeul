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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const Sale_1 = __importDefault(require("../model/Sale"));
const SpecialSale_1 = __importDefault(require("../model/SpecialSale"));
const Banner_1 = __importDefault(require("../model/Banner"));
router.get("/sales", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var sales = yield Sale_1.default.find().where('saleIndex').equals(Number(req.query.id)).populate("product");
        var salesOutput = [];
        console.log(sales);
        if (!sales) {
            return res.status(204).send();
        }
        for (let s of sales) {
            let saleDTO = {
                saleIndex: s.saleIndex,
                product: s.product,
                discountRate: s.discountRate,
                discountedPrice: 4400 * s.discountRate / 100
            };
            salesOutput.push(saleDTO);
        }
        res.json({ msg: "할인 정보 조회 성공", sales: salesOutput });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Server Error" });
    }
}));
router.get("/sales/specialPrice", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var specialSales = yield SpecialSale_1.default.find().populate("product");
        console.log(specialSales);
        if (!specialSales) {
            return res.status(204).send();
        }
        res.json({ msg: "특가 정보 조회 성공", specialPrices: specialSales });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Server Error" });
    }
}));
router.get("/banners", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //find()하면 배열로 리턴
        const banners = yield Banner_1.default.find();
        if (!banners) {
            return res.status(204).send();
        }
        res.json({ msg: "배너 조회 성공", banners: banners });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}));
module.exports = router;
//# sourceMappingURL=main.js.map