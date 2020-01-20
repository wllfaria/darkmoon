import { Request, Response } from "express";

import { Database } from "../../database";
import RequestValidator from "../../validations/v1/requestValidator.validation";
import EncodingHelper from "../../helpers/v1/encodingHelper.helper";
import Person from "../../models/v1/person.model";
import Email from "../../models/v1/emailConfirmation.model";
import { MessageFactory } from "../../models/v1/MessageFactory/messageFactory";
import SuccessMessage from "../../models/v1/MessageFactory/successMessage";
import ErrorMessage from "../../models/v1/MessageFactory/errorMessage";

import { Transaction, QueryInterface } from "sequelize/types";
import * as jwt from "jsonwebtoken";
import { ValidationError } from "express-validator";
import Address from "../../models/v1/address.model";
import Card from "../../models/v1/card.model";
import RequestStatus from "../../helpers/v1/requestStatus.helper";

export default class PersonController {
	public create = async (req: Request, res: Response) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const errorType: any = RequestStatus.errors().badRequest
				MessageFactory.buildResponse(ErrorMessage, res, errorType, { error: errors});
				return;
			}

			const { name, email, cpf, password }: any = req.body;
			const { salt, encodedPassword }: any = EncodingHelper.encodePassword(password);
			const guid: string = EncodingHelper.generateGuid();
			
			const existentPerson = await Person.findOne({ where: { email, cpf }});
			if(existentPerson && !existentPerson.password) {
				this.finishCreate(req, res, existentPerson);
				return;
			} else if (existentPerson && existentPerson.password) {
				const errorType: any = RequestStatus.errors().badRequest
				MessageFactory.buildResponse(ErrorMessage, res, errorType, `User with email: ${existentPerson.email} already exists.`);
				return;
			}
			const person: any = await Person.create({ name, email, cpf, password: encodedPassword, salt }, { transaction });
			await Email.create({ person_id: person.id, guid }, { transaction });
			const jwt = EncodingHelper.signJWT({ id: person.id, name: person.name });

			await transaction?.commit();
			const successType: any = RequestStatus.successes().create;
			MessageFactory.buildResponse(SuccessMessage, res, successType, { person: person, token: jwt });
		} catch (err) {
			await transaction?.rollback();
			const errorType: any = RequestStatus.errors().internal;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
		}
	}

	public login = async (req: Request, res: Response) => {
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const errorType: any = RequestStatus.errors().badRequest;
				MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
				return;
			}

			const { email, password }: any = req.body;
			const token: string = <string>req.headers.authorization;
			
			const verifiedToken = EncodingHelper.verifyJWT(token);

			const person: any = await Person.findOne({ where: { id: verifiedToken.id, email: email }})
			const authenticated: boolean = EncodingHelper.decodePassword(person.password, password, person.salt);

			if (authenticated) {
				const successType: any = RequestStatus.successes().ok;
				MessageFactory.buildResponse(SuccessMessage, res, successType, { person });
			} else {
				const errorType: any = RequestStatus.errors().badRequest;
				MessageFactory.buildResponse(ErrorMessage, res, errorType, 'Invalid password.');
			}
		} catch (err) {
			if(err instanceof jwt.JsonWebTokenError) {
				err = err.message;
			} else {
				err = 'Email Invalid.';
			}
			const errorType: any = RequestStatus.errors().badRequest;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err.message);
		}
	}

	public lazyCreate = async (req: Request, res: Response) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const errorType: any = RequestStatus.errors().badRequest		
				MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
				return
			}

			const { name, email, cpf, address: { zip_code, district, neighborhood, city, state, number, complement = null }, card: { number: card_number, flag, expiration, owner } = null }: any = req.body;
			
			const existentPerson = await Person.findOne({ where: { email, cpf }});
			if(existentPerson) {
				const errorType: any = RequestStatus.errors().badRequest;
				MessageFactory.buildResponse(ErrorMessage, res, errorType, `User with email: ${email} already exists.`);
				return;
			}

			const person = await Person.create({ name, email, cpf }, { transaction });
			await Address.create({ person_id: person.id, zip_code, district, neighborhood, city, state, number, complement }, { transaction });
			if(req.body.card != null) {
				await Card.create({ person_id: person.id, number: card_number, flag_id: flag, expiration, owner }, { transaction });
			}

			await transaction?.commit();
			const successType: any = RequestStatus.successes().create;
			MessageFactory.buildResponse(SuccessMessage, res, successType, { person });
		} catch (err) {
			await transaction?.rollback();
			const errorType: any = RequestStatus.errors().internal;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err.message);
		}
	}

	public finishCreate = async (req: Request, res: Response, person: any) => {
		const transaction = await Database.getInstance().getTransaction();
		try {
			const { name, email, cpf, password }: any = req.body;
			const guid = EncodingHelper.generateGuid();

			const { salt, encodedPassword }: any = EncodingHelper.encodePassword(password);
			await Person.update({ name, password: encodedPassword, salt }, { where: { email, cpf }, transaction });
			await Email.create({ person_id: person.id, guid }, { transaction });
			const updatedPerson: any = await Person.findOne({ where: { id: person.id }}) 
			const jwt = EncodingHelper.signJWT({ id: person.id, name: person.name });

			await transaction?.commit();
			const successType: any = RequestStatus.successes().ok;
			MessageFactory.buildResponse(SuccessMessage, res, successType, { person: updatedPerson, token: jwt })
		} catch (err) {
			await transaction?.rollback();
			const errorType: any = RequestStatus.errors().internal;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err.message);
		}
	}
}