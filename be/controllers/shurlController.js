import URLRecord from "../models/URLRecord.js";
import urlUtil from "../utils/urlUtil.js";
import CONSTANTS from "../utils/constants.js";
import LogUtil from "../utils/logUtil.js";
import AppError from "../models/errors/AppError.js";
import URLTempRecord from "../models/URLTempRecord.js";

const shurlController = {
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	generate: dbClient => async (req, res, next) => {
		try {
			LogUtil.log("shurlController generate: START")
			let {url, qrCode, expireIn, urlCode} = req.body;
			url = url.toLowerCase();
			let urlRecord = expireIn ? new URLTempRecord({url, ...(urlCode ? {urlCode} : {})}) : new URLRecord({url, ...(urlCode ? {urlCode} : {})});
			urlRecord = expireIn ? await dbClient.findTempUrl(urlRecord) : await dbClient.findUrl(urlRecord);
			if(!urlRecord) {
				let code;
				if(urlCode) {
					if(!await dbClient.hasCode(urlCode)) {
						code = urlCode;
					} else {
						return next(new AppError({code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.CONFLICT, message: "Url code già esistente"}));
					}
				} else {
					code = urlUtil.randomID();
					while(await dbClient.hasCode(code)) {
						code = urlUtil.randomID();
					}
				}
				urlRecord = expireIn ? new URLTempRecord({url}) : new URLRecord({url});
				urlRecord.urlCode = code;
				urlRecord.shortUrl = urlUtil.shortUrl(req, code);
				qrCode && (urlRecord.qrCode = await urlUtil.qrCode(urlRecord.shortUrl));
				!expireIn && urlRecord.addUser(res.locals.user.id);
				expireIn ? await dbClient.createTempUrl(urlRecord, expireIn) : await dbClient.createUrl(urlRecord);
			} else {
				if(expireIn) {
					return next(new AppError({code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.CONFLICT.code, message: "Esiste già un short url temporaneo per lo stesso url."}));
				} else {
					let update = false;
					if(qrCode && urlRecord.qrCode === '') {
						urlRecord.qrCode = await urlUtil.qrCode(urlRecord.shortUrl);
						update = true;
					}
					if(!qrCode) {
						urlRecord.qrCode = "";
					}
					if(!urlRecord.users.includes(res.locals.user.id)) {
						urlRecord.addUser(res.locals.user.id);
						update = true;
					}
					update && await dbClient.updateUrl(urlRecord);
				}
			}
			delete urlRecord.users;
			delete urlRecord.id;
			expireIn && delete urlRecord.expireAt;
			expireIn && delete urlRecord.updateAt;
			expireIn && delete urlRecord.clicked;
			return res.status(CONSTANTS.HTTP_CODE.SUCCESS.OK.code).send(urlRecord);
		} catch (e) {
			LogUtil.log("shurlController generate: Error ", e.message);
			next(e);
		} finally {
			LogUtil.log("shurlController generate: FINISH");
		}
	},
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	url: dbClient => async (req, res, next) => {
		try {
			LogUtil.log("shurlController url: START");
			let urlRecord = await dbClient.findUrl(new URLRecord({urlCode:req.params.code}));
			if(urlRecord) {
				urlRecord.clicked++;
				await dbClient.updateUrl(urlRecord);
				res.setHeader("Cache-Control", "no-cache");
				return res.redirect(CONSTANTS.HTTP_CODE.REDIRECTION.MOVED_PERMANENTLY.code, urlRecord.originalUrl);
			}
			urlRecord = await dbClient.findTempUrl(new URLTempRecord({urlCode:req.params.code}));
			if(urlRecord) {
				res.setHeader("Cache-Control", "no-cache");
				return res.redirect(CONSTANTS.HTTP_CODE.REDIRECTION.MOVED_PERMANENTLY.code, urlRecord.originalUrl);
			} else {
				next();
			}
		} catch (e) {
			next(e);
		} finally {
			LogUtil.log("shurlController url: FINISH");
		}
	}
}

export default shurlController;