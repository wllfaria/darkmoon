import RequestValidator from "../../validations/v1/requestValidator.validation"
import { Request, Response } from "express";
import Shirt from "../../models/v1/shirt.model";
import Sku from "../../models/v1/sku.model";
import ProductImage from "../../models/v1/productImage.model";

export default class ShirtController {
  public get = async (_req: Request, res: Response) => {
    try {
      let results = await Sku.findAll({include: [ProductImage]})
      console.log(results);
      res.status(200).json({ok: true, data: results})
    } catch (err) {
      res.status(400).json({failed: true})      
    }
  }

  public create = async (req: Request, res: Response) => {
    try {
      const requestValidator: RequestValidator = new RequestValidator();
      const errors = requestValidator.extractErrors(req);
      if(errors.length) { 
        requestValidator.validate(errors, res);
        return;
      }

      const { productName, productUrl, productType, avaliable, sku, price, size, model, gender, images } = req.body;

      await Sku.create({ product_name: productName, product_url: productUrl, product_type: productType, avaliable});
      await Shirt.create({ sku, price, size, model, gender });
      images.forEach(async (image: any) => {
        await ProductImage.create({ url: image.url, sku_id: sku, alt: image.alt })
      })
      res.status(200).json({ok: true});
    } catch (err) {
      res.status(400).json({failed: true});
    }
  }
}