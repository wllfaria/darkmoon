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
import ServerMessage from "../../models/v1/MessageFactory/serverMessage";
import { Sequelize, Transaction } from "sequelize/types";
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

  public create = async (req: Request, res: Response) => {

    const transaction = await ModelRepository.getInstance().getTransaction();
    try {
      const requestValidator: RequestValidator = new RequestValidator();
      const errors = requestValidator.extractErrors(req);
      if (errors.length) {
        requestValidator.validate(errors, res);
        return;
      }

      const { productName, productUrl, productType, avaliable, price, size, model, gender, images } = req.body;

      // Quem não tem colírio
      const skuResult: Sku = await Sku.create(
        {
          product_name: productName, product_url: productUrl, type_id: productType, avaliable
        }, 
        { 
          transaction 
        });
    
      // usa óculos escuro
      await Shirt.create({ sku_id: skuResult.id, price, size, model_id: model, gender_id: gender }, { transaction });
      // quem não tem filé
      images.forEach(async (image: any) => {
        await ProductImage.create({ url: image.url, sku_id: skuResult.id, alt: image.alt }, { transaction })
      });
      // come pão e osso duro
      await transaction?.commit();
      MessageFactory.buildResponse(SuccessMessage, res, { ok: true });
    } catch (err) {
      // quem não tem visão?
      await transaction?.rollback();
      // bate a cara contra o muro
      MessageFactory.buildResponse(ErrorMessage, res, err);
    }
  }
}