import express, { Request, Response } from "express";
import { ISale, ISaleOutputDTO } from "../interface/ISale"
const router = express.Router();

import Sale from "../model/Sale";
// import "../models/Category"

router.get(
    "/sales/:saleIndex",
    async(req: Request, res: Response) => {
        try{
            var sales = await Sale.find().where('saleIndex').equals(Number(req.params.saleIndex)).populate("product");
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

module.exports = router;
