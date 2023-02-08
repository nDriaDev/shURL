import {google} from "googleapis";
import {createTransport} from "nodemailer";

export default class MailClient {
	CLIENT_ID = process.env.MAIL_CLIENT_ID;
	CLIENT_SECRET = process.env.MAIL_CLIENT_SECRET;
	OAUTH_URL = process.env.MAIL_OAUTH_URL;
	REFRESH_TOKEN = process.env.MAIL_REFRESH_TOKEN;
	EMAIL_SENDER = process.env.MAIL_EMAIL_SENDER;
	transport = null;

	constructor() {
	}

	#createTransport() {
		try {
			const myOAuth2Client = new google.auth.OAuth2(
				this.CLIENT_ID,
				this.CLIENT_SECRET,
				this.OAUTH_URL
			)
			myOAuth2Client.setCredentials({
				refresh_token: this.REFRESH_TOKEN
			});
			this.transport = createTransport({
				service: "gmail",
				auth: {
					type: "OAuth2",
					user: this.EMAIL_SENDER,
					clientId: this.CLIENT_ID,
					clientSecret: this.CLIENT_SECRET,
					refreshToken: this.REFRESH_TOKEN,
					accessToken: myOAuth2Client.getAccessToken()
				}});
		} catch (e) {
			throw e;
		}
	}
	async sendMail({to, subject=null, html = null, text=null, amp}={}) {
		try {
			this.#createTransport();
			const mailOptions = {
				from: this.EMAIL_SENDER, // sender
				to, // receiver
				subject: subject || "", // Subject
				...(text && {text}),
				...(html && {html}),
				...(amp && {amp}),
			}
			await this.transport.sendMail(mailOptions);
			this.transport.close();
		} catch (e) {
			throw e;
		}
	}

}