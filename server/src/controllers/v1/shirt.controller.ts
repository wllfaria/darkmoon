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

export default class ShirtController {
public get = async (_req: Request, res: Response) => {
try {
	let results = await Sku.findAll({ include: [ProductType, { model: Shirt, include: [Gender, ProductModel] }, ProductImage] });
	const successType: any = RequestStatus.successes.ok;
	MessageFactory.buildResponse(SuccessMessage, res, successType, results);
} catch (err) {
	const errorType = RequestStatus.errors.internal;
	MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
}
}

	public getByUrl = (req: Request, res: Response) => {
		const requestValidator: RequestValidator = new RequestValidator();
		const errors = requestValidator.extractErrors(req);
		if (errors.length) {
			const errorType: any = RequestStatus.errors.badRequest
			MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
			return;
		}
		// Shirt.findOne()
	}

	public create = async (req: Request, res: Response) => {
		const transaction = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();
			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if (errors.length) {
				const errorType: any = RequestStatus.errors.badRequest;
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
		
			const shirt = await Shirt.create({ sku_id: skuResult.id, price, size, model_id: model, gender_id: gender }, { transaction });
			images.forEach(async (image: any) => {
				await ProductImage.create({ url: image.url, sku_id: skuResult.id, alt: image.alt }, { transaction })
			});
			await transaction?.commit();
			const successType: any = RequestStatus.successes.create
			MessageFactory.buildResponse(SuccessMessage, res, successType, shirt);
		} catch (err) {
			await transaction?.rollback();
			const errorType: any = RequestStatus.errors.badRequest;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
		}
	}
}