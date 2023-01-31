import AppError from "../models/errors/AppError.js";
import CONSTANTS from "../utils/constants.js";
import LogUtil from "../utils/logUtil.js";

export default function routeNotFoundController(req, res, next) {
	try {
		LogUtil.log("routeNotFoundController: START");
		const {code, text} = CONSTANTS.HTTP_CODE.CLIENT_ERRORS.NOT_FOUND;
		next(new AppError({code, message: text}));
	} catch (e) {
		next(e);
	} finally {
		LogUtil.log("routeNotFoundController: FINISH");
	}
}