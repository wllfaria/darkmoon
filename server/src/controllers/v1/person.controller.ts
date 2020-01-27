import { Request, Response } from "express";

import { Database } from "../../database";
import RequestValidator from "../../validations/v1/requestValidator.validation";
import EncodingHelper from "../../helpers/v1/encoding.helper";
import Person from "../../models/v1/person.model";
import EmailConfirmation from "../../models/v1/emailConfirmation.model";
import { MessageFactory } from "../../models/v1/MessageFactory/messageFactory";
import SuccessMessage from "../../models/v1/MessageFactory/successMessage";
import ErrorMessage from "../../models/v1/MessageFactory/errorMessage";
import EmailSender from '../../helpers/v1/emailSender.helper';

import { Transaction } from "sequelize/types";
import * as jwt from "jsonwebtoken";
import { ValidationError } from "express-validator";
import Address from "../../models/v1/address.model";
import Card from "../../models/v1/card.model";
import RequestStatus from "../../helpers/v1/requestStatus.helper";
import EmailTemplate from "../../models/v1/emailTemplate.model";
import EventListener from "../../helpers/v1/eventListener.helper";

export default class PersonController {
	public create = async (req: Request, res: Response) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const errorType: any = RequestStatus.errors.BAD_REQUEST
				MessageFactory.buildResponse(ErrorMessage, res, errorType, { error: errors});
				return;
			}

			const { name, email, cpf, password }: any = req.body;
			const personFirstName = name.split(' ')[0];
			const { salt, encodedPassword }: any = EncodingHelper.encodePassword(password);
			const guid: string = EncodingHelper.generateGuid();
			
			const existentPerson = await Person.findOne({ where: { email, cpf }, transaction });
			if(existentPerson && !existentPerson.password) {
				this.finishCreate(req, res, existentPerson);
				return;
			} else if (existentPerson && existentPerson.password) {
				const errorType: any = RequestStatus.errors.BAD_REQUEST
				MessageFactory.buildResponse(ErrorMessage, res, errorType, `User with email: ${existentPerson.email} already exists.`);
				return;
			}
			
			const person: any = await Person.create({ name, email, cpf, password: encodedPassword, salt }, { transaction });
			await EmailConfirmation.create({ person_id: person.id, guid }, { transaction });
			const mailTemplate: any = await EmailTemplate.findOne({ where: { name: "email-confirmation" }, transaction });
			await EmailSender.sendMail(person.email, mailTemplate, [personFirstName, guid]);
			await EventListener.registerEvent('user', 'register', `User ${person.name} has successfully registered.`);
			const jwt = EncodingHelper.signJWT({ id: person.id, name: person.name });

			await transaction?.commit();
			const successType: any = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, successType, { person: person, token: jwt });
		} catch (err) {
			await transaction?.rollback();
			const errorType: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
		}
	}

	public login = async (req: Request, res: Response) => {
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const errorType: any = RequestStatus.errors.BAD_REQUEST;
				MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
				return;
			}

			const { email, password }: any = req.body;
			const token: string = <string>req.headers.authorization;
			
			const verifiedToken = EncodingHelper.verifyJWT(token);

			const person: any = await Person.findOne({ where: { id: verifiedToken.id, email: email }})
			const authenticated: boolean = EncodingHelper.decodePassword(person.password, password, person.salt);

			if (authenticated) {
				const successType: any = RequestStatus.successes.OK;
				MessageFactory.buildResponse(SuccessMessage, res, successType, { person });
			} else {
				const errorType: any = RequestStatus.errors.BAD_REQUEST;
				MessageFactory.buildResponse(ErrorMessage, res, errorType, 'Invalid password.');
			}
		} catch (err) {
			if(err instanceof jwt.JsonWebTokenError) {
				err = err.message;
			} else {
				err = 'Email Invalid.';
			}
			const errorType: any = RequestStatus.errors.BAD_REQUEST;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
		}
	}

	public lazyCreate = async (req: Request, res: Response) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const errorType: any = RequestStatus.errors.BAD_REQUEST;		
				MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
				return
			}

			const { name, email, cpf, address: { zip_code, district, neighborhood, city, state, number, complement = null }, card: { number: card_number, flag, expiration, owner } = null }: any = req.body;
			
			const existentPerson = await Person.findOne({ where: { email, cpf }});
			if(existentPerson) {
				const errorType: any = RequestStatus.errors.BAD_REQUEST;
				MessageFactory.buildResponse(ErrorMessage, res, errorType, `User with email: ${email} already exists.`);
				return;
			}

			const person = await Person.create({ name, email, cpf }, { transaction });
			await Address.create({ person_id: person.id, zip_code, district, neighborhood, city, state, number, complement }, { transaction });
			if(req.body.card != null) {
				await Card.create({ person_id: person.id, number: card_number, flag_id: flag, expiration, owner }, { transaction });
			}
			await EventListener.registerEvent('user', 'lazy-register', `User ${person.name} has successfully lazy registered.`);

			await transaction?.commit();
			const successType: any = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, successType, { person });
		} catch (err) {
			await transaction?.rollback();
			const errorType: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
		}
	}

	public finishCreate = async (req: Request, res: Response, person: any) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
		try {
			const { name, email, cpf, password }: any = req.body;
			const personFirstName: string = name.split(' ')[0];
			const guid = EncodingHelper.generateGuid();

			const { salt, encodedPassword }: any = EncodingHelper.encodePassword(password);
			await Person.update({ name, password: encodedPassword, salt }, { where: { email, cpf }, transaction });
			await EmailConfirmation.create({ person_id: person.id, guid }, { transaction });
			const updatedPerson: any = await Person.findOne({ where: { id: person.id }}) 
			const mailTemplate: any = await EmailTemplate.findOne({ where: { name: "email-confirmation" }, transaction });
			await EmailSender.sendMail(updatedPerson.email, mailTemplate, [personFirstName, guid]);
			await EventListener.registerEvent('user', 'finish-register', `User ${name} has successfully finished his lazy registration.`);
			const jwt = EncodingHelper.signJWT({ id: person.id, name: person.name });

			await transaction?.commit();
			const successType: any = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, successType, { person: updatedPerson, token: jwt })
		} catch (err) {
			await transaction?.rollback();
			const errorType: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, errorType, err);
		}
	}

	public confirmEmail = async (req: Request, res: Response) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const errorType: any = RequestStatus.errors.BAD_REQUEST;		
				MessageFactory.buildResponse(ErrorMessage, res, errorType, errors);
				return;
			}

			const { guid } = req.body;

			const confirmation: any = await EmailConfirmation.findOne({ where: { guid }, transaction })
			await EmailConfirmation.update({ guid: null, updated_at: new Date(), deleted_at: new Date() }, { where: { guid, id: confirmation.id }, transaction });
			await Person.update({ email_confirmed: true }, { where: { id: confirmation.person_id }});
			const person: any = await  Person.findOne({ where: { id: confirmation.person_id }, transaction });
			await EventListener.registerEvent('user', 'email-confirmation', `User ${person.name} successfully confirmed his email.`);

			await transaction?.commit();
			const type: any = RequestStatus.successes.ACCEPTED;
			MessageFactory.buildResponse(SuccessMessage, res, type, {})
		} catch (err) {
			await transaction?.rollback();
			const type: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, type, err);
		}
	}

	public accountRecoveryMail = async (req: Request, res: Response) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();		
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const type: any = RequestStatus.errors.BAD_REQUEST;
				MessageFactory.buildResponse(ErrorMessage, res, type, errors);
				return;
			}

			const { email = null, cpf = null }: any = req.body;
			const pin: number = EncodingHelper.generatePin();
			let person: any;

			if(email) {
				person = await Person.findOne({ where: { email }, transaction })
			} else {
				person = await Person.findOne({ where: { cpf }, transaction })
			}

			await Person.update({ recovery_pin: pin }, { where: { id: person.id }, transaction });
			const mailTemplate: any = await EmailTemplate.findOne({ where: { name: "account-recovery" }, transaction });
			await EmailSender.sendMail(person.email, mailTemplate, [ person.name, pin ]);

			await transaction?.commit();
			const type: any = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, {});
		} catch (err) {
			await transaction?.rollback();
			const type: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, type, err);
		}
	}

	public verifyRecoveryPin = async (req: Request, res: Response) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const type: any = RequestStatus.errors.BAD_REQUEST;
				MessageFactory.buildResponse(ErrorMessage, res, type, errors);
				return;
			}

			const { pin, email = null, cpf = null }: any = req.query;
			let person: any;

			if(email) {
				person = await Person.findOne({ where: { email, recovery_pin: pin }, transaction });
				if(!person) {
					const type: any = RequestStatus.errors.BAD_REQUEST;
					MessageFactory.buildResponse(ErrorMessage, res, type, { error: 'Invalid pin or e-mail.' });
					return;
				}
			} else {
				person = await Person.findOne({ where: { cpf, recovery_pin: pin }, transaction });
				if(!person) {
					const type: any = RequestStatus.errors.BAD_REQUEST;
					MessageFactory.buildResponse(ErrorMessage, res, type, { error: 'Invalid pin or e-mail.' });
					return;
				}
			}

			await transaction?.commit();
			const type: any = RequestStatus.successes.ACCEPTED;
			MessageFactory.buildResponse(SuccessMessage, res, type, { pin, email, cpf, id: person.id });
		} catch (err) {
			await transaction?.rollback();
			const type: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, type, err);
		}
	}

	public accountRecovery = async (req: Request, res: Response) => {
		const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
		try {
			const requestValidator: RequestValidator = new RequestValidator();

			const errors: ValidationError[] = requestValidator.extractErrors(req);
			if(errors.length) {
				const type = RequestStatus.errors.BAD_REQUEST;
				MessageFactory.buildResponse(ErrorMessage, res, type, errors);
				return;
			}

			const { password, pin, id }: any = req.body;
			const { salt, encodedPassword }: any = EncodingHelper.encodePassword(password);

			let person: any = await Person.findOne({ where: { id, recovery_pin: pin }, transaction });
			const mailTemplate: any = await EmailTemplate.findOne({ where: { name: "password-changed" }, transaction })
			await Person.update({ recovery_pin: null, password: encodedPassword, salt, password_old: person.password, password_changed: new Date(), salt_old: person.salt, updated_at: new Date() }, { where: { id, recovery_pin: pin }, transaction })
			await EmailSender.sendMail(person.email, mailTemplate, [ person.name ]);
			await EventListener.registerEvent("user", "recovery", `User ${person.name} successfully recovered his password.`);
			person = await Person.findOne({ where: { id }, transaction });
			const jwt = EncodingHelper.signJWT({ id: person.id, name: person.name });

			await transaction?.commit();
			const type: any = RequestStatus.successes.OK;
			MessageFactory.buildResponse(SuccessMessage, res, type, { person, token: jwt })
		} catch (err) {
			await transaction?.rollback();
			const type: any = RequestStatus.errors.INTERNAL;
			MessageFactory.buildResponse(ErrorMessage, res, type, err);
		}
	}
}