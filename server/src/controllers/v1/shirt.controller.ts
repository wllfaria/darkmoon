import RequestValidator from "../../validations/v1/requestValidator.validation"
import { Request, Response } from "express";
import Shirt from "../../models/v1/shirt.model";
import Sku from "../../models/v1/sku.model";
import ProductImage from "../../models/v1/productImage.model";
import Gender from "../../models/v1/gender.model";
import ProductModel from "../../models/v1/productModel.model";
import ProductType from "../../models/v1/productType.model";

export default class ShirtController {
  public get = async (_req: Request, res: Response) => {
    try {
      let results = await Sku.findAll({include: [ProductType, { model: Shirt, include: [Gender, ProductModel] }, ProductImage]})
      res.status(200).json({ok: true, data: results})
    } catch (err) {
      res.status(400).json({failed: true, err})      
    }
  }

  public getByUrl = (req: Request, res: Response) => {
    const requestValidator: RequestValidator = new RequestValidator();
    const errors = requestValidator.extractErrors(req);
    if(errors.length) {
      requestValidator.validate(errors, res);
      return;
    }
    Shirt.findOne
  }

  public create = async (req: Request, res: Response) => {
    try {
      const requestValidator: RequestValidator = new RequestValidator();
      const errors = requestValidator.extractErrors(req);
      if(errors.length) { 
        requestValidator.validate(errors, res);
        return;
      }

      const { productName, productUrl, productType, avaliable, price, size, model, gender, images } = req.body;

      const skuResult: any = await Sku.create({ product_name: productName, product_url: productUrl, type_id: productType, avaliable });
      await Shirt.create({ sku_id: skuResult.id, price, size, model_id: model, gender_id: gender });
      images.forEach(async (image: any) => {
        await ProductImage.create({ url: image.url, sku_id: skuResult.id, alt: image.alt })
      })
      res.status(200).json({ok: true});
    } catch (err) {
      res.status(400).json({failed: true, err});
    }
  }
}