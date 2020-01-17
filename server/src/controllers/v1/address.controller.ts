import { Request, Response, response } from "express";
import Address from "../../models/v1/address.model";
import Person from "../../models/v1/person.model";
import { MessageFactory } from "../../models/v1/MessageFactory/messageFactory";
import SuccessMessage from "../../models/v1/MessageFactory/successMessage";
import ErrorMessage from "../../models/v1/MessageFactory/errorMessage";
import RequestValidator from "../../validations/v1/requestValidator.validation";

export default class AddressController {
    public get = async (_req: Request, res: Response) => {
        try {
            let results = Address.findAll({ include: [Person] });
            MessageFactory.buildResponse(SuccessMessage, res, results);
        } catch (e) {
            MessageFactory.buildResponse(ErrorMessage, res, e);
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const requestValidator: RequestValidator = new RequestValidator();
            const errors = requestValidator.extractErrors(req);
            if (errors.length) {
                MessageFactory.buildResponse(ErrorMessage, res, errors);
                return;
            }
            const { id }: any = req.query;
            const address = await Address.findOne({ where: { id } });
            MessageFactory.buildResponse(SuccessMessage, res, address);
        } catch (e) {
            MessageFactory.buildResponse(ErrorMessage, res, e);
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const requestValidator: RequestValidator = new RequestValidator();
            const errors = requestValidator.extractErrors(req);
            if (errors.length) {
                MessageFactory.buildResponse(ErrorMessage, res, errors);
                return;
            }
            const { zip_code, district, neighborhood, city, state, number, complement } = req.body;
            await Address.create({ zip_code, district, neighborhood, city, state, number, complement });
            MessageFactory.buildResponse(SuccessMessage, res, { ok: true });
        } catch (e) {
            MessageFactory.buildResponse(ErrorMessage, res, e);
        }
    }
}