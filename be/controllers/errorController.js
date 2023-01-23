import CONSTANTS from "../utils/constants.js";

export default function errorController(err, req, res, next) {
	let { code, text } = CONSTANTS.HTTP_CODE.SERVER_ERRORS.INTERNAL_SERVER_ERROR;
	let error = {
		code: err.code && !isNaN(err.code) && err.code || code,
		message: err.message || text
	}
	return res.status(error.code).json(error);
}