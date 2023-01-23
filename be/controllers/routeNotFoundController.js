import AppError from "../models/errors/AppError.js";
import CONSTANTS from "../utils/constants.js";

export default function routeNotFoundController(req, res, next) {
	const {code, text} = CONSTANTS.HTTP_CODE.CLIENT_ERRORS.NOT_FOUND;
	next(new AppError({code, message: text}));
}