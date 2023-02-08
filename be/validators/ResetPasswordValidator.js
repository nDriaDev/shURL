import {check} from "express-validator";

const ResetPasswordValidator = [
	check("token")
		.exists({checkFalsy: true, checkNull: true}).withMessage("required value").bail(),
	check('password')
		.exists({checkFalsy: true, checkNull: true}).withMessage("required value").bail()
		.trim()
		.isLength({min: 8}).withMessage("min length 8 characters").bail()
		.isStrongPassword({minSymbols:1, minUppercase:1, minNumbers: 1}).withMessage("it must contain at least one symbol, an uppercase, a lowercase and a number").bail(),
	check('confirmPassword')
		.exists({checkFalsy: true, checkNull: true}).withMessage("required value").bail()
		.trim()
		.custom((confirmPassword, {req}) => {
			const {password} = req.body;
			if(confirmPassword !== password) {
				throw Error("must be same to password");
			}
			return true;
		}).bail()
];

export default ResetPasswordValidator;