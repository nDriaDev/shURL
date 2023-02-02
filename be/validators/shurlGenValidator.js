import {check} from "express-validator";
import CONSTANTS from "../utils/constants.js";

const ShurlGenValidator = [
	check('url')
		.exists({checkNull: true, checkFalsy: true}).withMessage("valore obbligatorio").bail()
		.isURL({require_protocol: true, protocols:["https", "http"]}).withMessage("formato url non valido").bail(),
	check('qrCode')
		.isBoolean({strict:true}).withMessage("valore non valido").bail(),
	check('expireIn')
		.optional().bail()
		.isNumeric().withMessage("valore non valido").bail()
		.custom((value, { req }) => Object.values(CONSTANTS.EXPIRE_URL_IN).includes(value)).withMessage("durata non valida").bail()
];

export default ShurlGenValidator;