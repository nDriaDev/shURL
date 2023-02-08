import * as url from 'url';
import path from "path";
import CONSTANTS from "../utils/constants.js";
import LogUtil from "../utils/logUtil.js";
import HeadersUtils from "../utils/headersUtils.js";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default function feController(req, res, next) {
	try {
		LogUtil.log("feController: START");
		if (req.originalUrl.startsWith(CONSTANTS.PATHS.API)) {
			next();
		} else {
			const {DEV, PROD, DETA_SH} = CONSTANTS.PATHS.FE_ROOT_TO_SERVE;
			let pathFE = process.env.NODE_ENV === CONSTANTS.ENVIRONMENT.DEV ? DEV : process.env.NODE_ENV === CONSTANTS.ENVIRONMENT.DETA_SH ? DETA_SH : PROD;
			const {INITIAL, GENERATE, SIGNIN, SIGNUP} = CONSTANTS.PATHS.FE;

			HeadersUtils.setRelAndReportToHeaders(res, req.originalUrl, null, req);
			//set header noindex for all routes that not are mapped in fe router
			//so crawler not indexing error page
			![INITIAL, GENERATE, SIGNIN, SIGNUP].includes(req.originalUrl) && res.setHeader("X-Robots-Tag", "noindex");

			return res.sendFile(path.join(__dirname, pathFE, 'index.html'));
		}
	} catch (e) {
		next(e);
	} finally {
		LogUtil.log("feController: FINISH");
	}
}

