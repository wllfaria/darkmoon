import nodemailer from 'nodemailer';
import '../../env';
import { MailOptions } from 'nodemailer/lib/json-transport';

export default class EmailSender {
  private static createTransposer = () => {
    return nodemailer.createTransport({
      host: process.env.EMAILHOST,
      port: Number(process.env.EMAILPORT),
      secure: false,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS
      }
    })
  }

  public static sendMail = (email: string, template: any) => {
    const transporter = EmailSender.createTransposer()
    const mailOptions: MailOptions = {
      from: `'${template.from}' <${template.email}>`,
      to: email,
      subject: template.subject,
      html: template.html
    }
    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if(err) {
        return err;
      }
      return info;
    })
  }
}