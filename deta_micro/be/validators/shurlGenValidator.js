import {check} from "express-validator";

const ShurlGenValidator = [
	check('url')
		.exists({checkNull: true, checkFalsy: true}).withMessage("valore obbligatorio").bail()
		.isURL({require_protocol: true, protocols:["https", "http"]}).withMessage("formato url non valido").bail(),
	check('qrCode')
		.isBoolean({strict:true}).withMessage("valore non valido").bail()
];

export default ShurlGenValidator;