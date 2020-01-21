import { Request, Response, response } from "express";
import Address from "../../models/v1/address.model";
import Person from "../../models/v1/person.model";
import { MessageFactory } from "../../models/v1/MessageFactory/messageFactory";
import SuccessMessage from "../../models/v1/MessageFactory/successMessage";
import ErrorMessage from "../../models/v1/MessageFactory/errorMessage";
import RequestValidator from "../../validations/v1/requestValidator.validation";
import RequestStatus from "../../helpers/v1/requestStatus.helper";
import { ValidationError } from "express-validator";

export default class AddressController {
    public get = async (_req: Request, res: Response) => {
        try {
            const addresses: any = Address.findAll({ include: [Person] });

            const successType: any = RequestStatus.successes.OK;
            MessageFactory.buildResponse(SuccessMessage, res, successType, { addresses });
        } catch (err) {
            const errorType: any = RequestStatus.errors.INTERNAL;
            MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const requestValidator: RequestValidator = new RequestValidator();
            const errors: ValidationError[] = requestValidator.extractErrors(req);
            if (errors.length) {
                const errorType: any = RequestStatus.errors.BAD_REQUEST;
                MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
                return;
            }
            const { id }: any = req.query;
            const address: any = await Address.findOne({ where: { id } });

            const successType: any = RequestStatus.successes.OK;
            MessageFactory.buildResponse(SuccessMessage, res, successType, { address });
        } catch (err) {
            const errorType: any = RequestStatus.errors.INTERNAL;
            MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const requestValidator: RequestValidator = new RequestValidator();
            const errors: ValidationError[] = requestValidator.extractErrors(req);
            if (errors.length) {
                const errorType: any = RequestStatus.errors.BAD_REQUEST;
                MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
                return;
            }
            const { zip_code, district, neighborhood, city, state, number, complement }: any = req.body;

            const address: any = await Address.create({ zip_code, district, neighborhood, city, state, number, complement });

            const succesType: any = RequestStatus.successes.CREATE; 
            MessageFactory.buildResponse(SuccessMessage, res, succesType, { address });
        } catch (err) {
            const errorType: any = RequestStatus.errors.INTERNAL;
            MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
        }
    }
}