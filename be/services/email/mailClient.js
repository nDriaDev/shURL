import {google} from "googleapis";
import nodemailer from 'nodemailer';

export default class MailClient {
	transporter;
	EMAIL_SENDER = process.env.MAIL_SENDER;
	EMAIL_APP_HOST = process.env.MAIL_APP_HOST;
	EMAIL_APP_USER = process.env.MAIL_APP_USER;
	EMAIL_APP_PASS = process.env.MAIL_APP_PASS;
	EMAIL_APP_HOST = process.env.MAIL_APP_HOST;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: this.EMAIL_APP_HOST,
			port: 587,
			secure: false, // use false for STARTTLS; true for SSL on port 465
			auth: {
				user: this.EMAIL_APP_USER,
				pass: this.EMAIL_APP_PASS
			}
		});
	}

	async sendMail({to, subject=null, html = null, text=null, textEncoding="base64"}={}) {
		try {
			const mailOptions = {
				from: this.EMAIL_SENDER,
				to, // receiver
				subject: subject || "", // Subject
				...(text && {text}),
				...(html && {html}),
				textEncoding
			}
			const info = await this.transporter.sendMail(mailOptions);
			return info.messageId;
		} catch (e) {
			throw e;
		}
	}

}
