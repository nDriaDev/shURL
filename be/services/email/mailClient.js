import {google} from "googleapis";
import MailComposer from 'nodemailer/lib/mail-composer/index.js';

export default class MailClient {
	CLIENT_ID = process.env.MAIL_CLIENT_ID;
	CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
	MAIL_REDIRECT_URI = process.env.MAIL_REDIRECT_URI;
	ACCESS_TOKEN = process.env.ACCESS_TOKEN;
	EXPIRY_DATE = process.env.EXPIRY_DATE;
	SCOPE = process.env.SCOPE;
	TOKEN_TYPE = process.env.TOKEN_TYPE;
	REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
	oAuth2Client = null;

	constructor() {
	}

	#initGmailService() {
		try {
			this.oAuth2Client = new google.auth.OAuth2(this.CLIENT_ID, this.CLIENT_SECRET, this.MAIL_REDIRECT_URI);
			this.oAuth2Client.setCredentials({
				access_token: this.ACCESS_TOKEN,
				expiry_date: this.EXPIRY_DATE,
				refresh_token: this.REFRESH_TOKEN,
				scope: this.SCOPE,
				token_type: this.TOKEN_TYPE
			});
			return google.gmail({
				version: "v1",
				auth: this.oAuth2Client
			})
		} catch (e) {
			throw e;
		}
	}
	async sendMail({to, subject=null, html = null, text=null, textEncoding="base64"}={}) {
		try {
			const gmail = this.#initGmailService();
			const mailOptions = {
				to, // receiver
				subject: subject || "", // Subject
				...(text && {text}),
				...(html && {html}),
				textEncoding
			}
			const composer = new MailComposer(mailOptions);
			const message = Buffer.from(await composer.compile().build()).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
			const {data: {id} = {}} = await gmail.users.messages.send({
				userId: "me",
				resource: {
					raw: message
				}
			});
			return id;
		} catch (e) {
			throw e;
		}
	}

}
