import * as nodemailer from 'nodemailer';
import '../env';
import uuidv4 from 'uuid/v4';

import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import { mysqlpool } from '../database';
import { QueryError, RowDataPacket, OkPacket } from 'mysql';
import Emails from '../interfaces/emails.interface';

export default class EmailsModel {
  constructor() {
  }

  private transporter: any;

  private createTransporter() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAILHOST,
      port: Number(process.env.EMAILPORT),
      secure: false,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS
      }
    })
  }

  private generateGuid(): string {
    return uuidv4();
  }

  public createConfirmation(personId: number): Promise<string> {
    const guid: string = this.generateGuid();
    return new Promise(async (resolve, reject) => {
      const conn: any = await mysqlpool();
      conn.query(
        `
          insert into 
          email_confirmations
          set ?
        `,
        {person: personId, guid},
        async (error: QueryError, _results: OkPacket) => {
          conn.release()
          if(error) reject(error);
          resolve(guid);
        }
      )
    })
  }

  public getTemplate(templateName: string): Promise<Emails> {
    return new Promise(async (resolve, reject) => {
      const conn: any = await mysqlpool();
      conn.query(
        `
          select
          id,
          name,
          subject,
          template
          from email_templates
          where name = ?
        `,
        templateName,
        (error: QueryError, results: RowDataPacket[]) => {
          conn.release();
          if(error) reject(error);
          console.log(results)
          resolve(<Emails>results[0]);
        }
      )
    })
  }

  sendMail(sendTo: string, mailTemplate: Emails) {
    this.createTransporter();
    let mailOptions: MailOptions = {
      from: '"Teste" <willians@williansfaria.dev>',
      to: sendTo,
      subject: mailTemplate.subject,
      html: mailTemplate.template
    }
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(mailOptions, (error: any, info: any) => {
        if(error) reject(error);
        resolve(info);
      });
    })
  }
}