import {check} from "express-validator";
import CONSTANTS from "../utils/constants.js";

const ShurlGenValidator = [
	check('url')
		.exists({checkNull: true, checkFalsy: true}).withMessage("valore obbligatorio").bail()
		.isURL({require_protocol: true, protocols:["https", "http"]}).withMessage("formato url non valido").bail(),
	check('qrCode')
		.isBoolean({strict:true}).withMessage("valore non valido").bail(),
	check('expireIn')
		.optional({nullable: true})
		.custom((value, { req }) => Object.values(CONSTANTS.EXPIRE_URL_IN).includes(Number(value))).withMessage("durata non valida").bail()
];

export default ShurlGenValidator;