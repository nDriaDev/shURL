import { Deta } from 'deta';
import LogUtil from "../../utils/logUtil.js";
import URLRecord from "../../models/URLRecord.js";
import User from "../../models/User.js";
import URLTempRecord from "../../models/URLTempRecord.js";

export default class DetaDbClient {
	client;
	DB = process.env.DB;
	URLS = process.env.TABLE_URL;
	URLS_TEMP = process.env.TABLE_URL_TEMPORARY;
	USER = process.env.TABLE_USER;

	constructor() {
		this.client = Deta(process.env.PROJECT_KEY);
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
			url.createdAt = new Date().getTime();
			const result = await db.put(url)
			return true;
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient createUrl finish");
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
			return !count || count === 0 ? null :  URLRecord.mappingURLDBToURLRecord(items[0]);
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
			await db.update(updates, urlDB.id);
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient updateUrl finish");
		}
	}

	async createTempUrl(url, expireIn) {
		LogUtil.log("DetaClient createTempUrl START");
		try {
			const db = this.client.Base(this.URLS_TEMP);
			url.createdAt = new Date().getTime();
			if(Number.isInteger(expireIn)) {
				let dt = new Date();
				dt.setHours(dt.getHours()+expireIn);
				url.expireAt = dt;
			} else {
				let hours=0, minutes=Number(expireIn)*60;
				let dt = new Date();
				dt.setHours(dt.getHours()+hours, dt.getMinutes()+minutes);
				url.expireAt = dt;
			}
			let urlDB = URLTempRecord.mappingURLTempRecordToURLTempDB(url);
			const result = await db.put(urlDB, null, {expireAt:url.expireAt});
			return true;
		} catch (e) {
			throw e;
		} finally {
			LogUtil.log("DetaClient createTempUrl FINISH");
		}
	}

	async findTempUrl(url) {
		LogUtil.log("DetaClient findTempUrl START");
		try {
			const db = this.client.Base(this.URLS_TEMP);
			let query = [];
			let {originalUrl, shortUrl, urlCode} = url;
			originalUrl !== '' && query.push({originalUrl});
			shortUrl !== '' && query.push({shortUrl});
			urlCode !== '' && query.push({urlCode});
			query.length === 1 && (query = query[0]);

			const {count, last, items } = await db.fetch(query);
			return !count || count === 0 ? null :  URLTempRecord.mappingURLTempDBToURLTempRecord(items[0]);
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient findTempUrl FINISH");
		}
	}

	async createUser({email, password}) {
		LogUtil.log("DetaClient createUser start");
		try {
			const db = this.client.Base(this.USER);
			const result = await db.put({
				email,
				password,
				createdAt: new Date().getTime(),
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
				return User.mappingUserDBToUser(result);
			} else {
				let query = [];
				email !== null && query.push({email});
				password !== null && query.push({password});
				query.push({active: true});
				result = await db.fetch(query);
				if (result.count === 1) {
					return User.mappingUserDBToUser(result.items[0]);
				}
				return false;
			}
		} catch (error) {
			throw error;
		} finally {
			LogUtil.log("DetaClient findUser finish");
		}
	}
}