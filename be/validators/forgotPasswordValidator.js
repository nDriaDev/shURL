import {check} from "express-validator";

const ForgotPasswordValidator = [
	check('email')
		.exists({checkFalsy: true, checkNull: true}).withMessage("required value").bail()
		.trim()
		.toLowerCase()
		.isEmail().withMessage("invalid format").bail(),
];

export default ForgotPasswordValidator;