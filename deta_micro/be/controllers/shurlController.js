import URLRecord from "../models/URLRecord.js";
import urlUtil from "../utils/urlUtil.js";
import CONSTANTS from "../utils/constants.js";
import LogUtil from "../utils/logUtil.js";
import AppError from "../models/errors/AppError.js";

const shurlController = {
	/**
	 *
	 * @param {DbClient} dbClient
	 */
	generate: dbClient => async (req, res, next) => {
		try {
			LogUtil.log("shurlController generate: START")
			let {url, qrCode} = req.body;
			url = url.toLowerCase();
			let urlRecord = new URLRecord({url});
			urlRecord = await dbClient.findUrl(urlRecord);
			if(!urlRecord) {
				let code = urlUtil.randomID();
				while(await dbClient.hasCode(code)) {
					code = urlUtil.randomID();
				}
				urlRecord = new URLRecord({url});
				urlRecord.urlCode = code;
				urlRecord.shortUrl = urlUtil.shortUrl(req, code);
				qrCode && (urlRecord.qrCode = await urlUtil.qrCode(urlRecord.shortUrl));
				urlRecord.addUser(res.locals.user._id.toString());
				await dbClient.createUrl(urlRecord);
			} else {
				let update = false;
				if(qrCode && urlRecord.qrCode === '') {
					urlRecord.qrCode = await urlUtil.qrCode(urlRecord.shortUrl);
					update = true;
				}
				if(!qrCode) {
					urlRecord.qrCode = "";
				}
				if(!urlRecord.users.includes(res.locals.user._id.toString())) {
					urlRecord.addUser(res.locals.user._id.toString());
					update = true;
				}
				update && await dbClient.updateUrl(urlRecord);
			}
			delete urlRecord.users;
			delete urlRecord._id;
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
				res.redirect(CONSTANTS.HTTP_CODE.REDIRECTION.MOVED_PERMANENTLY.code, urlRecord.originalUrl);
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