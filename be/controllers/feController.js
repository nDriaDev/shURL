import * as url from 'url';
import path from "path";
import CONSTANTS from "../utils/constants.js";
import LogUtil from "../utils/logUtil.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function feController(req, res, next) {
	try {
		LogUtil.log("feController: START");
		let pathname = new URL(req.originalUrl, import.meta.url).pathname;
		if (pathname.startsWith(CONSTANTS.PATHS.API)) {
			next();
		} else {
			const {DEV, PROD, DETA_SH} = CONSTANTS.PATHS.FE_ROOT_TO_SERVE;
			let pathFE = process.env.NODE_ENV === CONSTANTS.ENVIRONMENT.DEV ? DEV : process.env.NODE_ENV === CONSTANTS.ENVIRONMENT.DETA_SH ? DETA_SH : PROD;
			return res.sendFile(path.join(__dirname, pathFE, 'index.html'));
		}
	} catch (e) {
		next(e);
	} finally {
		LogUtil.log("feController: FINISH");
	}
}

