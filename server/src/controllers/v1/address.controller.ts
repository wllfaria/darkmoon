import { Request, Response, response } from "express";
import Address from "../../models/v1/address.model";
import Person from "../../models/v1/person.model";
import { MessageFactory } from "../../models/v1/MessageFactory/messageFactory";
import SuccessMessage from "../../models/v1/MessageFactory/successMessage";
import ErrorMessage from "../../models/v1/MessageFactory/errorMessage";
import RequestValidator from "../../validations/v1/requestValidator.validation";
import RequestStatus from "../../helpers/v1/requestStatus.helper";
import { ValidationError } from "express-validator";
import AddressBLO from "../../blo/v1/address.blo";
import log4js from 'log4js';

export default class AddressController {

    private errorLogger = log4js.getLogger("error");

    public get = async (_req: Request, res: Response) => {
        try {
            const blo = new AddressBLO();
            const addresses = blo.getAll([Person]);

            const successType = RequestStatus.successes.OK;
            MessageFactory.buildResponse(SuccessMessage, res, successType, { addresses });
        } catch (err) {
            this.errorLogger.error(err.toString());
            const errorType = RequestStatus.errors.INTERNAL;
            MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
        }
    }

    public getById = async (req: Request, res: Response) => {
        try {
            const requestValidator: RequestValidator = new RequestValidator();
            const errors: ValidationError[] = requestValidator.extractErrors(req);
            if (errors.length) {
                const errorType = RequestStatus.errors.BAD_REQUEST;
                MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
                return;
            }
            const { id } = req.query;
            const blo = new AddressBLO();
            const address = await blo.getById(id);

            const successType = RequestStatus.successes.OK;
            MessageFactory.buildResponse(SuccessMessage, res, successType, { address });
        } catch (err) {
            this.errorLogger.error(err.toString());
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
            const blo = new AddressBLO();

            const address = await blo.create(zip_code, district, neighborhood, city, state, number, complement);
            if (!address) {
                MessageFactory.buildResponse(ErrorMessage, res, RequestStatus.errors.INTERNAL, null);
                return;
            }

            const successType = RequestStatus.successes.CREATE; 
            MessageFactory.buildResponse(SuccessMessage, res, successType, { address });
        } catch (err) {
            this.errorLogger.error(err.toString());
            const errorType = RequestStatus.errors.INTERNAL;
            MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
        }
    }
}