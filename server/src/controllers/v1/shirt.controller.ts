import RequestValidator from "../../validations/v1/requestValidator.validation"
import { Request, Response } from "express";
import Shirt from "../../models/v1/shirt.model";
import Sku from "../../models/v1/sku.model";
import ProductImage from "../../models/v1/productImage.model";
import Gender from "../../models/v1/gender.model";
import ProductModel from "../../models/v1/productModel.model";
import ProductType from "../../models/v1/productType.model";
import { MessageFactory } from "../../models/v1/MessageFactory/messageFactory";
import ErrorMessage from "../../models/v1/MessageFactory/errorMessage";
import SuccessMessage from "../../models/v1/MessageFactory/successMessage";
import { ModelRepository } from "../../database";

export default class ShirtController {
  public get = async (_req: Request, res: Response) => {
    try {
      let results = await Sku.findAll({ include: [ProductType, { model: Shirt, include: [Gender, ProductModel] }, ProductImage] });
      MessageFactory.buildResponse(SuccessMessage, res, results);
    } catch (err) {
      MessageFactory.buildResponse(ErrorMessage, res, err);
    }
  }

  public getByUrl = (req: Request, res: Response) => {
    const requestValidator: RequestValidator = new RequestValidator();
    const errors = requestValidator.extractErrors(req);
    if (errors.length) {
      MessageFactory.buildResponse(ErrorMessage, res, errors);
      return;
    }
    Shirt.findOne
  }

  public create = async (req: Request, res: Response) => {

    const transaction = await ModelRepository.getInstance().getTransaction();
    try {
      const requestValidator: RequestValidator = new RequestValidator();
      const errors = requestValidator.extractErrors(req);
      if (errors.length) {
        MessageFactory.buildResponse(ErrorMessage, res, errors);
        return;
      }
      const { productName, productUrl, productType, avaliable, price, size, model, gender, images } = req.body;
      const skuResult: Sku = await Sku.create(
        {
          product_name: productName, product_url: productUrl, type_id: productType, avaliable
        },
        {
          transaction
        });

      await Shirt.create({ sku_id: skuResult.id, price, size, model_id: model, gender_id: gender }, { transaction });
      images.forEach(async (image: any) => {
        await ProductImage.create({ url: image.url, sku_id: skuResult.id, alt: image.alt }, { transaction })
      });
      await transaction?.commit();
      MessageFactory.buildResponse(SuccessMessage, res, { ok: true });
    } catch (err) {
      // Rollbacks everything in case of explosion
      await transaction?.rollback();
      MessageFactory.buildResponse(ErrorMessage, res, err);
    }
  }
}