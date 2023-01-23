import {check} from "express-validator";

const AuthValidator = [
	check('email')
		.exists({checkFalsy: true, checkNull: true}).withMessage("valore obbligatorio").bail()
		.isEmail().withMessage("formato non valido").bail()
		.normalizeEmail({all_lowercase: true}),
	check('password')
		.exists({checkFalsy: true, checkNull: true}).withMessage("valore obbligatorio").bail()
		.trim()
		.isLength({min: 8}).withMessage("lunghezza minima 8 caratteri").bail()
		.isStrongPassword({minSymbols:1, minUppercase:1, minNumbers: 1}).withMessage("deve contenere almeno un simbolo una maiuscola una minuscola e un numero").bail()
];

export default AuthValidator;