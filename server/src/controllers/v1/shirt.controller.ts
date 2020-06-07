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
import ProductSize from "../../models/v1/productSize.model";
import SkuBLO from "../../blo/v1/sku.blo";
import log4js from 'log4js';

export default class ShirtController {

	private errorLogger = log4js.getLogger("error");

	public get = async (_req: Request, res: Response) => {
		try {
			const blo = new SkuBLO();
			let shirts = await blo.getAll([ProductType, { model: Shirt, include: [Gender, ProductModel] }, ProductImage]);
			let type = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, shirts);
		} catch (err) {
			this.errorLogger.error(err.toString());
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
			const blo = new SkuBLO();
			const result = await blo.getByProductUrl(url, [
				{ model: ProductImage }, 
				{ model: ProductType }, 
				{ model: ProductModel }, 
				{ model: Shirt, include: [ ProductSize ]}, 
				{ model: Gender }
			]);
			let type = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, result);
		} catch (e) {
			this.errorLogger.error(e.toString());
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

			const { productName, productUrl, productType, available, price, size, model, gender, images } = req.body;
			const skuBlo = new SkuBLO();
			const sku = await skuBlo.create(productName, productUrl, productType, available, transaction);
			if (!sku) {
				transaction?.rollback();
				MessageFactory.buildResponse(ErrorMessage, res, RequestStatus.errors.INTERNAL, { message: "Failed to create the SKU." });
				return;
			}

			const shirt: Shirt = await Shirt.create({ sku_id: sku.id, price, size, model_id: model, gender_id: gender }, { transaction });
			images.forEach(async (image: any) => {
				await ProductImage.create({ url: image.url, sku_id: sku.id, alt: image.alt }, { transaction })
			});
			await transaction?.commit();
			let type: any = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, { ok: true });
		} catch (err) {
			this.errorLogger.error(err.toString());
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
			this.errorLogger.error(err.toString());
			const type: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, type, err);
		}
	}
}