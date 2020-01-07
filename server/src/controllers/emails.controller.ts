import { Request, Response } from "express";
import EmailsModel from '../models/emails.model';
// import Emails from "../interfaces/emails.interface";

export default class EmailsController {
  constructor() {}

  public async createConfirmation(req: Request, res: Response) {
    try {
      const emailsModel: EmailsModel = new EmailsModel();
      const guid: string = await emailsModel.createConfirmation(req.body.personId);
      // const template: Emails = await emailsModel.getTemplate("email-confirmation");
      // await emailsModel.sendMail("williansfaria@hotmail.com", template)
      res.status(200).json({ok: guid})
    } catch (error) {
      res.status(400).json({failed: true, error})
    }
  }
}