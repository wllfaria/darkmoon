import nodemailer, { Transporter } from 'nodemailer';
import '../../env';
import { MailOptions } from 'nodemailer/lib/json-transport';
import EventListener from './eventListener.helper';

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

	public static sendMail = (email: string, template: any, links: string[]) => {
		console.log('sending mail')
		const transporter: Transporter = EmailSender.createTransporter()
		console.log('transporter')
		const replacedTemplate: any = EmailSender.replaceLinks(template, links);
		console.log('replaced')
		const mailOptions: MailOptions = {
			from: `${replacedTemplate.sender} <${replacedTemplate.email}>`,
			to: email,
			subject: replacedTemplate.subject,
			html: replacedTemplate.html
		}
		return new Promise((resolve, reject) => {
			transporter.sendMail(mailOptions, async (err: any, info: any) => {
				if (err) {
					console.log(err)
					reject(err)
				}
				await EventListener.registerEvent('email', 'email-sent', `Email successfully sent to ${email}.`)
				console.log('info', info)
				resolve(info);
			})
		})
	}
}