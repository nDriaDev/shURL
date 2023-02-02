import CONSTANTS from "../utils/constants.js";
import LogUtil from "../utils/logUtil.js";

export default function errorController(err, req, res, next) {
	try {
		LogUtil.log("errorController: START");
		let { code, text } = CONSTANTS.HTTP_CODE.SERVER_ERRORS.INTERNAL_SERVER_ERROR;
		let error = {
			code: err.code && !isNaN(err.code) && err.code || code,
			message: err.message || text
		}
		return res.status(error.code).send(error);
	} catch (e) {
		next(e);
	} finally {
		LogUtil.log("errorController: FINISH");
	}
}