import {validationResult} from "express-validator";
import CONSTANTS from "../utils/constants.js";
import {UTILS} from "../utils/utils.js";
import AppError from "../models/errors/AppError.js";

export default function validatorMiddleware(validators, {parallels = false} = {}) {
	return async (req, res, next) => {
		let errors;
		if(parallels) {
			await Promise.all(validators.map(validation => validation.run(req)));

			errors = validationResult(req);
			if (errors.isEmpty()) {
				return next();
			}
		} else {
			for (let validation of validators) {
				const result = await validation.run(req);
				if (Array.isArray(result) ? result.some(el => el.errors.length > 0) : result.errors.length) {
					break;
				}
			}

			errors = validationResult(req);
			if (errors.isEmpty()) {
				return next();
			}
		}
		return res.status(CONSTANTS.HTTP_CODE.CLIENT_ERRORS.BAD_REQUEST.code).json(new AppError({
			code: CONSTANTS.HTTP_CODE.CLIENT_ERRORS.BAD_REQUEST.text,
			message: UTILS.formatErrors(errors.array())
		}));
	}
}