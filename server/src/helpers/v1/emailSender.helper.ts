import nodemailer from 'nodemailer';
import '../../env';
import { MailOptions } from 'nodemailer/lib/json-transport';
import EmailTemplate from '../../models/v1/emailTemplate.model';

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

  public static replaceLinks = (template: any, ...links: string[]) => {
    const numberOfLinks = template.html.match(/(###LINK###)/g)
    if (links.length !== numberOfLinks.length) {
      throw new Error(`You passed ${links.length} links and the template only accepts exact ${numberOfLinks.length} links.`);
    }
    links.forEach(link => {
      template.html = template.html.replace(/(###LINK###)/, link)
    })
    return template;
  }

  public static sendMail = (email: string, template: any) => {
    const transporter = EmailSender.createTransposer()
    const mailOptions: MailOptions = {
      from: `'${template.sender}' <${template.email}>`,
      to: email,
      subject: template.subject,
      html: template.html
    }
    transporter.sendMail(mailOptions, (err: any, info: any) => {
      if(err) {
        throw new Error(err);
      }
      return info;
    })
  }
}