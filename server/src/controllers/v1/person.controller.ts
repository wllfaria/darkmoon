import { Request, Response } from "express";

import { Database } from "../../database";
import RequestValidator from "../../validations/v1/requestValidator.validation";
import EncodingHelper from "../../helpers/v1/encodingHelper.helper";
import Person from "../../models/v1/person.model";
import Email from "../../models/v1/emailConfirmation.model";
import { MessageFactory } from "../../models/v1/MessageFactory/messageFactory";
import SuccessMessage from "../../models/v1/MessageFactory/successMessage";
import ErrorMessage from "../../models/v1/MessageFactory/errorMessage";

import { Transaction } from "sequelize/types";
import * as jwt from "jsonwebtoken";

export default class PersonController {
  public create = async (req: Request, res: Response) => {
    const transaction: Transaction | undefined = await Database.getInstance().getTransaction();
    try {
      const requestValidator: RequestValidator = new RequestValidator();

      const errors: any = requestValidator.extractErrors(req);
      if(errors.length) {
        requestValidator.validate(errors, res);
        return;
      }

      const { name, email, cpf, password }: any = req.body;
      const { salt, encodedPassword }: any = EncodingHelper.encodePassword(password);
      const guid: string = EncodingHelper.generateGuid();
      
      const person: any = await Person.create({ name, email, cpf, password: encodedPassword, salt }, { transaction });
      await Email.create({ person_id: person.id, guid }, { transaction });
      const jwt = EncodingHelper.signJWT({ id: person.id, name: person.name });

      await transaction?.commit();
      MessageFactory.buildResponse(SuccessMessage, res, { ok: true, data: { person: person, token: jwt }});
    } catch (err) {
      await transaction?.rollback();
      MessageFactory.buildResponse(ErrorMessage, res, err);
    }
  }

  public login = async (req: Request, res: Response) => {
    try {
      const requestValidator: RequestValidator = new RequestValidator();

      const errors: any = requestValidator.extractErrors(req);
      if(errors.length) {
        requestValidator.validate(errors, res);
        return;
      }

      const { email, password }: any = req.body;
      const token: string = <string>req.headers.authorization;
      
      const verifiedToken = EncodingHelper.verifyJWT(token);

      const person: any = await Person.findOne({ where: { id: verifiedToken.id, email: email }})
      const authenticated: boolean = EncodingHelper.decodePassword(person.password, password, person.salt);

      if (authenticated) {
        MessageFactory.buildResponse(SuccessMessage, res, { ok: true, data: person });
      } else {
        MessageFactory.buildResponse(SuccessMessage, res, { ok: false, message: 'Invalid password.' });
      }
    } catch (err) {
      if(err instanceof jwt.JsonWebTokenError) {
        err = { ok: false, message: err.message }
      } else {
        err = { ok: false, message: 'Email Invalid.' }
      }
      MessageFactory.buildResponse(ErrorMessage, res, err)
    }
  }
}