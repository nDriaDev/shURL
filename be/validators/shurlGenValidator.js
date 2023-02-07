import {check} from "express-validator";
import CONSTANTS from "../utils/constants.js";

const ShurlGenValidator = [
	check('url')
		.exists({checkNull: true, checkFalsy: true}).withMessage("required value").bail()
		.isURL({require_protocol: true, protocols:["https", "http"]}).withMessage("invalid format url").bail(),
	check('qrCode')
		.isBoolean({strict:true}).withMessage("invalid value").bail(),
	check('expireIn')
		.optional({nullable: true})
		.custom((value, { req }) => Object.values(CONSTANTS.EXPIRE_URL_IN).includes(Number(value))).withMessage("invalid period").bail(),
	check('urlCode')
		.optional({checkFalsy: true, nullable: true})
		.isAlphanumeric().trim().withMessage("invalid value").bail()
];

export default ShurlGenValidator;