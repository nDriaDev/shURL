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
			return res.sendFile(path.join(__dirname, CONSTANTS.PATHS.FE_ROOT_TO_SERVE, 'index.html'));
		}
	} catch (e) {
		next(e);
	} finally {
		LogUtil.log("feController: FINISH");
	}
}

