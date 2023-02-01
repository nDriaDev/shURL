import { Deta } from 'deta';
import LogUtil from "../../utils/logUtil.js";
import DBError from "../../models/errors/DBError.js";
import CONSTANTS from "../../utils/constants.js";
import URLRecord from "../../models/URLRecord.js";
import {ObjectId} from "mongodb";

export default class DetaDbClient {
	client;
	DB = process.env.DB;
	URLS = process.env.TABLE_URL;
	USER = process.env.TABLE_USER;

	constructor() {
		this.client = Deta();
	}

	async connect() {
		LogUtil.log("DetaClient connect start");
		try {

		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient connect finish");
		}
	}

	async disconnect() {
		LogUtil.log("DetaClient disconnect start");
		try {
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient disconnect finish");
		}
	}

	async findUrl(url) {
		LogUtil.log("DetaClient findUrl start");
		try {
			const db = this.client.Base(this.URLS);
			let query = [];
			let {originalUrl, shortUrl, urlCode} = url;
			originalUrl !== '' && query.push({originalUrl});
			shortUrl !== '' && query.push({shortUrl});
			urlCode !== '' && query.push({urlCode});
			query.length === 1 && (query = query[0]);

			const {count, last, items } = await db.fetch(query);
			return count === 0 ? null : items[0];
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient findUrl finish");
		}
	}

	async updateUrl(url) {
		LogUtil.log("DetaClient updateUrl start");
		try {
			const db = this.client.Base(this.URLS);
			const urlDB = await this.findUrl(url);
			const updates = {
				clicked: url.clicked,
				...(url.qrCode !== '' && {qrCode: url.qrCode}),
				users: url.users,
				updateAt: new Date().getTime()
			};
			await db.update(updates, urlDB.key);
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient updateUrl finish");
		}
	}

	async hasCode(code) {
		LogUtil.log("DetaClient hasCode start");
		try {
			const existedUrl = await this.findUrl(new URLRecord({urlCode: code}));
			return !!existedUrl;
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient hasCode finish");
		}
	}

	async createUrl(url) {
		LogUtil.log("DetaClient createUrl start");
		try {
			const db = this.client.Base(this.URLS);
			url.created = new Date().getTime();
			const result = await db.put(url)
			return true;
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient createUrl finish");
		}
	}

	async createUser({email, password}) {
		LogUtil.log("DetaClient createUser start");
		try {
			const db = this.client.Base(this.USER);
			const result = await db.put({
				email,
				password,
				created: new Date().getTime(),
				active: true
			})
			return true;
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient createUser finish");
		}
	}

	async findUser({id=null, email=null, password=null}) {
		LogUtil.log("DetaClient findUser start");
		try {
			const db = this.client.Base(this.USER);
			let result;
			if(id) {
				result = await db.get(id);
			} else {
				let query = [];
				email !== null && query.push({email});
				password !== null && query.push({password});
				query.push({active: true});
				result = await db.fetch(query);
			}

			if (result.count === 1) {
				return result.items[0];
			}
			return false;
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient findUser finish");
		}
	}
}