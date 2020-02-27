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
import { Database } from "../../database";
import RequestStatus from "../../helpers/v1/requestStatus.helper";
import { ValidationError } from "express-validator";
import Query = require("mysql/lib/protocol/sequences/Query");
import ProductSize from "../../models/v1/productSize.model";

export default class ShirtController {
	public get = async (_req: Request, res: Response) => {
		try {
			let shirts: Sku[] = await Sku.findAll({ include: [ProductType, { model: Shirt, include: [Gender, ProductModel] }, ProductImage] });
			let type = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, shirts);
		} catch (err) {
			let type = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, type, err);
		}
	}

	public getByUrl = async (req: Request, res: Response) => {
		try {
			const requestValidator: RequestValidator = new RequestValidator();
			const errors = requestValidator.extractErrors(req);
			if (errors.length) {
				let type = RequestStatus.errors.BAD_REQUEST;
				MessageFactory.buildResponse(ErrorMessage, res, type, errors);
				return;
			}
			const { url } = req.params;
			const result: Sku | null = await Sku.findOne({ 
				include: [
					{ model: ProductImage }, 
					{ model: ProductType }, 
					{ model: ProductModel }, 
					{ model: Shirt, include: [ ProductSize ]}, 
					{ model: Gender }
				], 
				where: { product_url: url } 
			});
			let type = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, result);
		} catch (e) {
			let type = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, type, e);
		}
	}

	public create = async (req: Request, res: Response) => {
		const transaction = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();
			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if (errors.length) {
				const errorType: any = RequestStatus.errors.BAD_REQUEST;
				MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
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

			const shirt: Shirt = await Shirt.create({ sku_id: skuResult.id, price, size, model_id: model, gender_id: gender }, { transaction });
			images.forEach(async (image: any) => {
				await ProductImage.create({ url: image.url, sku_id: skuResult.id, alt: image.alt }, { transaction })
			});
			await transaction?.commit();
			let type: any = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, { ok: true });
		} catch (err) {
			await transaction?.rollback();
			const errorType: any = RequestStatus.errors.BAD_REQUEST;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
		}
	}

	public getDistinct = async (_req: Request, res: Response) => {
		try {
			const distinctShirts: Sku[] = await Sku.findAll({ where: { type_id: 1 }, include: [ProductImage, ProductType, ProductModel, Gender, Shirt] });
			const type: any = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, distinctShirts)
		} catch (err) {
			const type: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, type, err);
		}
	}
}