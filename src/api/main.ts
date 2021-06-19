import express, { Request, Response } from "express";
import { ISale, ISaleOutputDTO } from "../interface/ISale"
const router = express.Router();

import Sale from "../model/Sale";
import SpecialSale from "../model/SpecialSale";
import Banner from "../model/Banner";

router.get(
    "/sales",
    async(req: Request, res: Response) => {
        try{
            var sales = await Sale.find().where('saleIndex').equals(Number(req.query.id)).populate("product");
            var salesOutput: ISaleOutputDTO[]=[];
            console.log(sales);
            if (!sales){
                return res.status(204).send();
            }
            for (let s of sales){
                let saleDTO: ISaleOutputDTO = {
                    saleIndex: s.saleIndex,
                    product: s.product,
                    discountRate: s.discountRate,
                    discountedPrice: 4400 * s.discountRate / 100
                };
                salesOutput.push(saleDTO);
            }
            res.json({msg:"할인 정보 조회 성공",sales:salesOutput});
        } catch (error){
            console.error(error.message);
            res.status(500).send({message:"Server Error"});
        }
    }
)

router.get(
    "/sales/specialPrice",
    async(req: Request, res: Response) => {
        try{
            var specialSales = await SpecialSale.find().populate("product");
            console.log(specialSales);
            if (!specialSales){
                return res.status(204).send();
            }
            
            res.json({msg:"특가 정보 조회 성공",specialPrices:specialSales});
        } catch (error){
            console.error(error.message);
            res.status(500).send({message:"Server Error"});
        }
    }
)

router.get(
    "/banners",
    async(req: Request, res: Response) => {
        try{
            //find()하면 배열로 리턴
            const banners = await Banner.find();
            if (!banners){
                return res.status(204).send();
            }
            res.json({msg:"배너 조회 성공",banners:banners});
        } catch (error){
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
)


module.exports = router;
