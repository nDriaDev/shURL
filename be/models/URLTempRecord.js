import URLRecord from "./URLRecord.js";

export default class URLTempRecord extends URLRecord {
	expireAt = null;

	constructor({expireAt = null, ...rest} = {}) {
		super(rest);
		this.expireAt = expireAt;
	}

	static mappingURLTempRecordToURLTempDB(url) {
		let urlDB = {...url};
		delete urlDB.updateAt;
		delete urlDB.clicked;
		delete urlDB.users;
		return urlDB;
	}
	static mappingURLTempDBToURLTempRecord({expireAt, ...rest}) {
		let url = {...super.mappingURLDBToURLRecord(rest)};
		url.expireAt = expireAt || null;
		return url;
	}
}