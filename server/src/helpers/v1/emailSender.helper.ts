import nodemailer, { Transport, Transporter } from 'nodemailer';
import '../../env';
import { MailOptions } from 'nodemailer/lib/json-transport';
import EventListener from './eventListener.helper';
import { Transaction } from 'sequelize/types';

export default class EmailSender {
	private static createTransporter = () => {
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

	private static replaceLinks = (template: any, links: string[]) => {
		const numberOfLinks = template.html.match(/(###REPLACE###)/g)
		if (links.length !== numberOfLinks.length) {
			throw new Error(`You passed ${links.length} links and the template only accepts exact ${numberOfLinks.length} links.`);
		}
		links.forEach(link => {
			template.html = template.html.replace(/(###REPLACE###)/, link)
		})
		return template;
	}

	public static sendMail = (email: string, template: any, links: string[], transaction: Transaction | undefined) => {
		const transporter: Transporter = EmailSender.createTransporter()
		const replacedTemplate: any = EmailSender.replaceLinks(template, links);
		const mailOptions: MailOptions = {
			from: `${replacedTemplate.sender} <${replacedTemplate.email}>`,
			to: email,
			subject: replacedTemplate.subject,
			html: replacedTemplate.html
		}
		return new Promise((resolve, reject) => {
			transporter.sendMail(mailOptions, async (err: any, info: any) => {
				if (err) {
					reject(err)
				}
				await EventListener.registerEvent('email', 'email-sent', `Email successfully sent to ${email}.`, transaction)
				resolve(info);
			})
		})
	}
}