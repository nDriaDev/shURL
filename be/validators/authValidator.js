import {check} from "express-validator";

const AuthValidator = [
	check('email')
		.exists({checkFalsy: true, checkNull: true}).withMessage("required value").bail()
		.trim()
		.toLowerCase()
		.isEmail().withMessage("invalid format").bail(),
	check('password')
		.exists({checkFalsy: true, checkNull: true}).withMessage("required value").bail()
		.trim()
		.isLength({min: 8}).withMessage("min length 8 characters").bail()
		.isStrongPassword({minSymbols:1, minUppercase:1, minNumbers: 1}).withMessage("it must contain at least one symbol, an uppercase, a lowercase and a number").bail()
];

export default AuthValidator;